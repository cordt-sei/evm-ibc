import React, { useState, useEffect } from 'react';
import { JsonRpcProvider } from 'ethers';
import { useChainInfo } from '../hooks/useChainInfo';
import { useTransactionStatus } from '../hooks/useTransactionStatus';
import { validateAddress } from '../utils/addressValidation';
import { executeTransfer } from '../contracts/ibcPrecompile';
import { IBCToken, ChainInfo } from '../types';
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
  const provider = new JsonRpcProvider(process.env.REACT_APP_SEI_RPC_URL);

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
      // Convert block height to a number since that's what our TransferParams expects
      const currentBlock = await provider.getBlockNumber();
      const timeoutBlock = Number(currentBlock) + 1500;
      if (timeoutBlock > Number.MAX_SAFE_INTEGER) {
        throw new Error('Block height exceeds safe number range');
      }

      const timeoutTimestamp = BigInt(Date.now() * 1_000_000) + BigInt(600 * 1_000_000_000);
      const tx = await executeTransfer({
        toAddress: receiver,
        port: 'transfer',
        channel: selectedToken.channel,
        denom: selectedToken.denom,
        amount: BigInt(amount),
        revisionNumber: 1,
        revisionHeight: timeoutBlock, // Now correctly typed as number
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

  // Convert to proper ChainInfo type from the chain data
  const chainInfoForSuggestion: ChainInfo | undefined = chainData && {
    chainId: chainData.chainId,
    chainName: chainData.chainName,
    bech32Prefix: chainData.bech32Prefix,
    slip44: chainData.slip44,
    chainData: chainData.chainData,
    staking: chainData.staking
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Return IBC Token</h2>
      {chainInfoForSuggestion && (
        <>
          <WalletSuggestion
            chain={chainInfoForSuggestion}
            onWalletSelect={setReceiver}
          />
          <div className="space-y-2">
            <input
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              placeholder={`${chainInfoForSuggestion.bech32Prefix}... address`}
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="w-full p-2 border rounded"
              min="0"
            />
            <button 
              type="submit" 
              disabled={!validateAddress(receiver, chainInfoForSuggestion) || status.status === 'pending'}
              className={`w-full p-2 rounded ${
                status.status === 'pending' 
                  ? 'bg-gray-300' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {status.status === 'pending' ? 'Processing...' : 'Return Token'}
            </button>
          </div>
          {status.error && (
            <p className="text-red-500">{status.error.message}</p>
          )}
        </>
      )}
    </form>
  );
};

export default TransferForm;