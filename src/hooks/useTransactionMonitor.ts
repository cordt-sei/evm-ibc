// src/hooks/useTransactionMonitor.ts
import { useState, useCallback } from 'react';
import { JsonRpcProvider } from 'ethers';
import { CONFIG } from '../config/config';
import { TransactionStatus } from '../types';

export function useTransactionMonitor(provider: JsonRpcProvider) {
  const [monitoringStatus, setMonitoringStatus] = useState<TransactionStatus>({
    status: 'idle'
  });

  const checkTransaction = useCallback(async (
    hash: string,
    maxAttempts: number = 10
  ): Promise<boolean> => {
    let attempts = 0;
    
    setMonitoringStatus({ status: 'pending', hash });
    
    while (attempts < maxAttempts) {
      try {
        const tx = await provider.getTransaction(hash);
        if (!tx) {
          attempts++;
          await new Promise(resolve => setTimeout(resolve, 1000));
          continue;
        }
        
        const receipt = await tx.wait();
        const success = receipt?.status === 1;
        
        setMonitoringStatus({
          status: success ? 'success' : 'error',
          hash,
          receipt
        });
        
        return success;
      } catch (error) {
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    setMonitoringStatus({
      status: 'error',
      hash,
      error: new Error('Transaction monitoring timeout')
    });
    
    return false;
  }, [provider]);

  return { 
    monitoringStatus,
    checkTransaction 
  };
}

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