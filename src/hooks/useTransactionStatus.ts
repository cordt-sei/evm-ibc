// src/hooks/useTransactionStatus.ts
import { useState } from 'react';
import { TransactionStatus } from '../types';

export function useTransactionStatus() {
  const [status, setStatus] = useState<TransactionStatus>({
    status: 'idle'
  });

  const handleError = (error: Error) => {
    setStatus({ status: 'error', error });
  };

  const handleSuccess = (receipt: any) => {
    setStatus({ status: 'success', receipt });
  };

  const setPending = (hash: string) => {
    setStatus({ status: 'pending', hash });
  };

  return { status, handleError, handleSuccess, setPending };
}