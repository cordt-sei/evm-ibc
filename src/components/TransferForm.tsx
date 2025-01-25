// src/components/TransferForm.tsx
import React, { useState, useEffect } from 'react';
import { JsonRpcProvider } from 'ethers';
import { useChainInfo } from '../hooks/useChainInfo';
import { useTransactionStatus } from '../hooks/useTransactionStatus';
import { validateAddress } from '../utils/addressValidation';
import { executeTransfer } from '../contracts/ibcPrecompile';
import { IBCToken, ChainInfo } from '../types';

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
    if (!chainData) {
      handleError(new Error('Chain configuration missing'));
      return;
    }

    try {
      const currentBlock = await provider.getBlockNumber();
      const timeoutBlock = currentBlock + 1500;

      const tx = await executeTransfer({
        toAddress: receiver,
        port: 'transfer',
        channel: selectedToken.channel,
        denom: selectedToken.denom,
        amount: BigInt(amount),
        revisionNumber: 1,
        revisionHeight: timeoutBlock,
        timeoutTimestamp: BigInt(Date.now() * 1_000_000) + BigInt(600 * 1_000_000_000),
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

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Return IBC Token</h2>
      
      {chainData ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Receiving Address ({chainData.chainName})
            </label>
            <input
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              placeholder={`${chainData.bech32Prefix}... address`}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount ({selectedToken.trace.base_denom})
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount to return"
              min="0"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button 
            type="submit" 
            disabled={!isValidAddress || status.status === 'pending'}
            className={`w-full p-3 rounded-lg font-medium ${
              !isValidAddress || status.status === 'pending'
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {status.status === 'pending' ? 'Processing...' : 'Return Token'}
          </button>

          {status.error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
              {status.error.message}
            </div>
          )}
          
          {status.status === 'success' && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md text-green-700">
              Transaction successful!
            </div>
          )}
        </form>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
          Loading chain configuration...
        </div>
      )}
    </div>
  );
};

export default TransferForm;