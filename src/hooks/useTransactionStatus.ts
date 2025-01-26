// src/hooks/useTransactionStatus.ts
import { useState } from 'react';
import { CONFIG } from '../config/config';
import type { TransactionStatus } from '../types';

export function useTransactionStatus() {
  const [status, setStatus] = useState<TransactionStatus>({
    status: 'idle'
  });

  const handleError = (error: Error) => {
    let errorMessage = error.message;

    // Map common errors to user-friendly messages
    if (error.message.includes('insufficient funds')) {
      errorMessage = 'Insufficient funds to complete the transaction';
    } else if (error.message.includes('user rejected')) {
      errorMessage = 'Transaction was rejected by the user';
    } else if (error.message.includes('gas required exceeds')) {
      errorMessage = 'Transaction would exceed gas limit. Please try again with a higher gas limit.';
    }

    setStatus({ 
      status: 'error', 
      error: new Error(errorMessage)
    });
  };

  const handleSuccess = (receipt: any) => {
    setStatus({ 
      status: 'success', 
      receipt,
      hash: receipt.hash,
      blockExplorerUrl: `${CONFIG.BLOCK_EXPLORER}/tx/${receipt.hash}`
    });
  };

  const setPending = (hash: string) => {
    setStatus({ 
      status: 'pending', 
      hash,
      blockExplorerUrl: `${CONFIG.BLOCK_EXPLORER}/tx/${hash}`
    });
  };

  const reset = () => {
    setStatus({ status: 'idle' });
  };

  return { 
    status, 
    handleError, 
    handleSuccess, 
    setPending,
    reset
  };
}