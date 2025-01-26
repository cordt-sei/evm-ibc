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

// Define the enum-like object for transaction status
export const TransactionStatusValues = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

// Define type for status values
export type TransactionStatusValue = typeof TransactionStatusValues[keyof typeof TransactionStatusValues];

// Define the transaction status interface
export interface TransactionStatus {
  status: TransactionStatusValue;
  hash?: string;
  error?: Error;
  receipt?: any;
  blockExplorerUrl?: string;
}