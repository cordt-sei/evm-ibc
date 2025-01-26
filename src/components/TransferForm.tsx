// src/components/TransferForm.tsx
import React, { useState, useEffect } from 'react';
import { JsonRpcProvider } from 'ethers';
import { IBCToken } from '../types';
import { validateAddress } from '../utils/chain';
import { constructTransferParams, estimateGasWithBuffer } from '../utils/transaction';
import { getTokenDisplayInfo } from '../utils/tokenDisplay';
import { executeTransfer } from '../contracts/ibcPrecompile';
import { useChainInfo } from '../hooks/useChainInfo';
import { useTransactionStatus } from '../hooks/useTransactionStatus';
import WalletSuggestion from './WalletSuggestion';

const convertToBaseUnits = (amount: string, decimals: number): bigint => {
  // Remove any trailing decimal places beyond what's supported
  const parts = amount.split('.');
  const whole = parts[0];
  const decimal = parts[1]?.slice(0, decimals) || '';
  const paddedDecimal = decimal.padEnd(decimals, '0');
  
  // Combine whole and decimal parts, removing any leading zeros
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
  
  const provider = new JsonRpcProvider(
    process.env.REACT_APP_SEI_RPC_URL || 'https://evm-rpc.sei-apis.com'
  );

  useEffect(() => {
    if (selectedToken) {
      fetchChainInfo(selectedToken.channel, 'transfer');
    }
  }, [selectedToken, fetchChainInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const currentBlock = await provider.getBlockNumber();
      const height = {
        revision_number: '1',
        revision_height: currentBlock.toString()
      };

      const { decimals } = getTokenDisplayInfo(selectedToken);
      const baseUnits = convertToBaseUnits(amount, decimals);

      const transferParams = constructTransferParams(
        selectedToken,
        receiver,
        baseUnits,
        height
      );

      const gasConfig = await estimateGasWithBuffer(provider, transferParams);
      
      const tx = await executeTransfer(transferParams, provider, gasConfig);
      setPending(tx.hash);
      
      const receipt = await tx.wait();
      handleSuccess(receipt);
    } catch (error) {
      handleError(error as Error);
      console.error('Transfer error:', error);
    }
  };

  if (!selectedToken.chainInfo) {
    return <div>Loading chain configuration...</div>;
  }

  const { symbol, decimals } = getTokenDisplayInfo(selectedToken);
  const isValidAddress = validateAddress(receiver, selectedToken.chainInfo);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and a single decimal point
    if (/^\d*\.?\d*$/.test(value)) {
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
          />
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
          />
        </div>

        <button
          type="submit"
          disabled={!isValidAddress || status.status === 'pending' || !amount}
          className={`w-full p-2 rounded font-medium ${
            !isValidAddress || status.status === 'pending' || !amount
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {status.status === 'pending' ? 'Processing...' : 'Return Token'}
        </button>

        {status.error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded">
            {status.error.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default TransferForm;