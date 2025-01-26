// src/types/state.ts
import type { IBCToken } from './ibc';
import type { TransactionStatus } from './transaction';

export interface TokenState {
  selectedToken: IBCToken | null;
  tokens: IBCToken[];
  loading: boolean;
  error: string | null;
}

export interface WalletState {
  address: string | null;
  connected: boolean;
  chainId: number | null;
  balance: string | null;
  error: string | null;
}

export interface TransactionState {
  status: TransactionStatus;
  history: TransactionStatus[];
  pendingTransactions: Set<string>;
}

export interface FormState {
  recipient: string;
  amount: string;
  memo: string;
  validations: {
    recipient: boolean;
    amount: boolean;
  };
}