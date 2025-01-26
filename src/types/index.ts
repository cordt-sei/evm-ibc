// src/types/index.ts
// Chain and Registry Types
export type {
  Height,
  ChainInfo,
  ChainResponse,
  ExtendedChain,
} from './chain';

// Configuration Types
export type {
  Environment,
  APIEndpoints,
  APIConfig,
  NetworkConfig,
  AppConfig,
  APIResponse,
  DenomTraceResponse,
} from './config';

// Dynamic Types
export type {
  EVMNetwork,
  DynamicConfig,
} from './dynamic';

// Transaction Types
export type {
  TransferParams,
  GasConfig,
  TransactionStatus,
  TransactionStatusValue,
} from './transaction';

export { TransactionStatusValues } from './transaction';

// IBC Types
export type {
  DenomTrace,
  IBCToken,
  TokenDisplay,
} from './ibc';

// Wallet Types
export type {
  KeplrWindow,
  KeplrCurrency,
  KeplrFeeCurrency,
  KeplrChainInfo,
  WalletConfig,
  WalletBalance,
} from './wallet';

// Error Types
export type {
  APIError,
  TransactionError,
  ValidationError,
} from './errors';

// Validation Types
export type {
  AddressValidation,
  AmountValidation,
  DenomValidation,
  ChainValidation,
} from './validation';

// State Types
export type {
  TokenState,
  WalletState,
  TransactionState,
  FormState,
} from './state';

// Network and Chain Status Constants
export const NetworkType = {
  MAINNET: 'mainnet',
  TESTNET: 'testnet',
  DEVNET: 'devnet',
} as const;

export const ChainStatus = {
  LIVE: 'live',
  UPCOMING: 'upcoming',
  KILLED: 'killed',
} as const;

// Type definitions for constants
export type NetworkTypeType = typeof NetworkType[keyof typeof NetworkType];
export type ChainStatusType = typeof ChainStatus[keyof typeof ChainStatus];

// Helper type for optional fields
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Helper type for required fields
export type Required<T, K extends keyof T> = T & { [P in K]-?: T[P] };

// Helper type for deep partial
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};