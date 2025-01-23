// src/hooks/useTransactionMonitor.ts
import { JsonRpcProvider } from 'ethers';

export function useTransactionMonitor(provider: JsonRpcProvider) {
  const checkTransaction = async (hash: string): Promise<boolean> => {
    try {
      const tx = await provider.getTransaction(hash);
      if (!tx) return false;
      const receipt = await tx.wait();
      return receipt.status === 1;
    } catch {
      return false;
    }
  };

  return { checkTransaction };
}