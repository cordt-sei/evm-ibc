// src/hooks/useTransactionMonitor.ts
import { useState, useCallback } from 'react';
import { JsonRpcProvider } from 'ethers';
import type { TransactionStatus } from '../types';

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