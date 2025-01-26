// src/components/TransferForm.tsx
import React, { useState, useEffect } from 'react';
import type { IBCToken } from '../types';
import { validation } from '../utils/validation';
import { getTokenDisplayInfo } from '../utils/tokenDisplay';
import { useChainInfo } from '../hooks/useChainInfo';
import { useTransactionStatus } from '../hooks/useTransactionStatus';
import { CONFIG } from '../config/config';

// Lazy load heavy dependencies
const loadEthers = () => import(/* webpackChunkName: "ethers" */ 'ethers');
const loadTransaction = () => import(/* webpackChunkName: "transaction" */ '../utils/transaction');
const loadWalletSuggestion = () => import(/* webpackChunkName: "wallet-suggestion" */ './WalletSuggestion');

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
  const [WalletSuggestion, setWalletSuggestion] = useState<React.ComponentType<any> | null>(null);
  
  useEffect(() => {
    // Dynamically load WalletSuggestion component
    loadWalletSuggestion().then(module => {
      setWalletSuggestion(() => module.default);
    });
  }, []);

  useEffect(() => {
    if (selectedToken) {
      fetchChainInfo(selectedToken.channel, 'transfer');
    }
  }, [selectedToken, fetchChainInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const [{ JsonRpcProvider }, { transaction }] = await Promise.all([
        loadEthers(),
        loadTransaction()
      ]);

      const provider = new JsonRpcProvider(CONFIG.RPC_URL);

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
      {WalletSuggestion && (
        <WalletSuggestion 
          chain={selectedToken.chainInfo} 
          onWalletSelect={setReceiver} 
        />
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rest of the form JSX remains the same */}
      </form>
    </div>
  );
};

export default TransferForm;