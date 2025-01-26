// src/types/transaction.ts
export interface TransferParams {
  toAddress: string;
  port: string;
  channel: string;
  denom: string;
  amount: bigint;
  revisionNumber: number;
  revisionHeight: number;
  timeoutTimestamp: bigint;
  memo: string;
}

export interface GasConfig {
  gasLimit: bigint;
  maxFeePerGas?: bigint;
  maxPriorityFeePerGas?: bigint;
}

export interface TransactionStatus {
  status: 'idle' | 'pending' | 'success' | 'error';
  hash?: string;
  error?: Error;
  receipt?: any;
  blockExplorerUrl?: string;
}