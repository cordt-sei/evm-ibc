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
  const provider = new JsonRpcProvider(process.env.REACT_APP_SEI_RPC_URL);

  useEffect(() => {
    if (selectedToken) {
      fetchChainInfo(selectedToken.channel, 'transfer');
    }
  }, [selectedToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chainInfo.get(selectedToken.channel)) return;

    try {
      const timeoutTimestamp = BigInt(Date.now() * 1_000_000) + BigInt(600 * 1_000_000_000);
      const tx = await executeTransfer({
        toAddress: receiver,
        port: 'transfer',
        channel: selectedToken.channel,
        denom: selectedToken.denom,
        amount: BigInt(amount),
        revisionNumber: 1,
        revisionHeight: BigInt(await provider.getBlockNumber()) + BigInt(1500),
        timeoutTimestamp,
        memo: ''
      }, provider, { gasLimit: BigInt(2000000) });

      setPending(tx.hash);
      const receipt = await tx.wait();
      handleSuccess(receipt);
    } catch (error) {
      handleError(error as Error);
    }
  };

  const chainData = chainInfo.get(selectedToken.channel);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Return IBC Token</h2>
      {chainData && (
        <>
          <WalletSuggestion
            chain={chainData.chainData}
            onWalletSelect={setReceiver}
          />
          <input
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            placeholder={`${chainData.bech32Prefix}... address`}
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
          <button 
            type="submit" 
            disabled={!validateAddress(receiver, chainData) || status.status === 'pending'}
          >
            {status.status === 'pending' ? 'Processing...' : 'Return Token'}
          </button>
          {status.error && <p className="error">{status.error.message}</p>}
        </>
      )}
    </form>
  );
};

export default TransferForm;