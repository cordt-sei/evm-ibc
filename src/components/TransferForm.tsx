// src/components/TransferForm.tsx
import React, { useState, useEffect } from 'react';
import { JsonRpcProvider } from 'ethers';
import { useChainInfo } from '../hooks/useChainInfo';
import { useTransactionStatus } from '../hooks/useTransactionStatus';
import { validateAddress } from '../utils/addressValidation';
import { executeTransfer } from '../contracts/ibcPrecompile';
import { IBCToken } from '../types';
import WalletSuggestion from './WalletSuggestion';

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
  const provider = new JsonRpcProvider(process.env.REACT_APP_SEI_RPC_URL || 'https://evm-rpc.sei.basementnodes.ca');

  useEffect(() => {
    if (selectedToken) {
      fetchChainInfo(selectedToken.channel, 'transfer');
    }
  }, [selectedToken, fetchChainInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const chainData = chainInfo.get(selectedToken.channel);
    if (!chainData) return;

    try {
      const currentBlock = await provider.getBlockNumber();
      const timeoutBlock = currentBlock + 1500;
      const timeoutTimestamp = BigInt(Date.now() * 1_000_000) + BigInt(600 * 1_000_000_000);

      const tx = await executeTransfer({
        toAddress: receiver,
        port: 'transfer',
        channel: selectedToken.channel,
        denom: selectedToken.denom,
        amount: BigInt(amount),
        revisionNumber: 1,
        revisionHeight: timeoutBlock,
        timeoutTimestamp,
        memo: ''
      }, provider, { gasLimit: BigInt(2000000) });

      setPending(tx.hash);
      const receipt = await tx.wait();
      handleSuccess(receipt);
    } catch (error) {
      handleError(error as Error);
      console.error('Transfer error:', error);
    }
  };

  const chainData = chainInfo.get(selectedToken.channel);
  const isValidAddress = chainData ? validateAddress(receiver, chainData) : false;

  if (!chainData) {
    return <div>Loading chain configuration...</div>;
  }

  return (
    <div className="space-y-4">
      <WalletSuggestion chain={chainData} onWalletSelect={setReceiver} />
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Receiving Address
          </label>
          <input
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            placeholder={`${chainData.bech32Prefix}... address`}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount ({selectedToken.trace.base_denom})
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={!isValidAddress || status.status === 'pending'}
          className={`w-full p-2 rounded font-medium ${
            !isValidAddress || status.status === 'pending'
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