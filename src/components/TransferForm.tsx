// src/components/TransferForm.tsx
import React, { useState, useEffect } from 'react';
import { JsonRpcProvider } from 'ethers';
import { IBCToken } from '../types';
import { validation } from '../utils/validation';
import { transaction } from '../utils/transaction';
import { getTokenDisplayInfo } from '../utils/tokenDisplay';
import { useChainInfo } from '../hooks/useChainInfo';
import { useTransactionStatus } from '../hooks/useTransactionStatus';
import WalletSuggestion from './WalletSuggestion';
import { CONFIG } from '../config/config';

const convertToBaseUnits = (amount: string, decimals: number): bigint => {
  const parts = amount.split('.');
  const whole = parts[0];
  const decimal = parts[1]?.slice(0, decimals) || '';
  const paddedDecimal = decimal.padEnd(decimals, '0');
  const combinedStr = `${whole}${paddedDecimal}`.replace(/^0+/, '');
  return BigInt(combinedStr || '0');
};

interface TransferFormProps {
  selectedToken: IBCToken;
  walletAddress: string;
}

const TransferForm: React.FC<TransferFormProps> = ({
  selectedToken,
  walletAddress,
}) => {
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const { chainInfo, fetchChainInfo } = useChainInfo();
  const { status, handleError, handleSuccess, setPending } = useTransactionStatus();
  
  const provider = new JsonRpcProvider(CONFIG.RPC_URL);

  useEffect(() => {
    if (selectedToken) {
      fetchChainInfo(selectedToken.channel, 'transfer');
    }
  }, [selectedToken, fetchChainInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Verify network connection
      const network = await provider.getNetwork();
      if (network.chainId !== BigInt(CONFIG.EVM_CHAIN_ID)) {
        throw new Error(`Wrong network. Expected chain ID ${CONFIG.EVM_CHAIN_ID}`);
      }

      const currentBlock = await provider.getBlockNumber();
      const height = {
        revision_number: '1',
        revision_height: currentBlock.toString()
      };

      const { decimals } = getTokenDisplayInfo(selectedToken);
      const baseUnits = convertToBaseUnits(amount, decimals);

      const transferParams = transaction.constructTransferParams(
        selectedToken,
        receiver,
        baseUnits,
        height
      );

      const gasConfig = await transaction.estimateGas(provider, transferParams);
      
      const tx = await transaction.executeTransfer(transferParams, provider, gasConfig);
      setPending(tx.hash);
      
      const receipt = await tx.wait();
      handleSuccess(receipt);
    } catch (error) {
      handleError(error as Error);
      console.error('Transfer error:', error);
    }
  };

  if (!selectedToken.chainInfo) {
    return (
      <div className="p-4 text-center text-gray-600">
        Loading chain configuration...
      </div>
    );
  }

  const { symbol, decimals } = getTokenDisplayInfo(selectedToken);
  const isValidAddress = validation.address(receiver, selectedToken.chainInfo);
  const isValidAmount = validation.amount(amount, decimals);
  const isTransactionPending = status.status === 'pending';

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validation.amount(value, decimals)) {
      setAmount(value);
    }
  };

  return (
    <div className="space-y-4">
      <WalletSuggestion chain={selectedToken.chainInfo} onWalletSelect={setReceiver} />
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Receiving Address
          </label>
          <input
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            placeholder={`${selectedToken.chainInfo.bech32_prefix}... address`}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            disabled={isTransactionPending}
          />
          {receiver && !isValidAddress && (
            <p className="mt-1 text-sm text-red-600">
              Invalid address for this chain
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount ({symbol})
          </label>
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            placeholder={`Enter amount (up to ${decimals} decimals)`}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            disabled={isTransactionPending}
          />
          {amount && !isValidAmount && (
            <p className="mt-1 text-sm text-red-600">
              Invalid amount format
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValidAddress || !isValidAmount || isTransactionPending}
          className={`w-full p-2 rounded font-medium ${
            !isValidAddress || !isValidAmount || isTransactionPending
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isTransactionPending ? 'Processing...' : 'Return Token'}
        </button>

        {status.error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded">
            {status.error.message}
          </div>
        )}

        {status.status === 'success' && (
          <div className="p-3 text-sm text-green-600 bg-green-50 rounded">
            Transaction successful! View on{' '}
            <a
              href={`${CONFIG.BLOCK_EXPLORER}/tx/${status.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              explorer
            </a>
          </div>
        )}
      </form>
    </div>
  );
};

export default TransferForm;