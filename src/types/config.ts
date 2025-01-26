// src/types/config.ts
export interface Environment {
  rpcUrl: string;
  chainId: string;
  evmChainId: number;
  blockExplorer: string;
  api: {
    baseUrl: string;
    endpoints?: {
      [key: string]: string;
    };
  };
  network: {
    chainName: string;
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
    blockExplorerUrls: string[];
  };
}

export interface APIEndpoints {
  IBC_TRANSFER: string;
  BANK: string;
  IBC_CLIENT: string;
}

export interface APIConfig {
  BASE_URL: string;
  TIMEOUT: number;
  ENDPOINTS: APIEndpoints;
}

export interface NetworkConfig {
  NAME: string;
  NATIVE_CURRENCY: {
    name: string;
    symbol: string;
    decimals: number;
  };
  BLOCK_EXPLORER_URLS: string[];
}

export interface AppConfig {
  ENVIRONMENT_ID: string;
  CHAIN_ID: string;
  EVM_CHAIN_ID: number;
  RPC_URL: string;
  API_URL: string;
  BLOCK_EXPLORER: string;
  IBC_PRECOMPILE: string;
  DEFAULT_GAS_LIMIT: bigint;
  TIMEOUT_MINUTES: number;
  BLOCK_TIME_SECONDS: number;
  API: APIConfig;
  NETWORK: NetworkConfig;
}

// API Response types
export interface APIResponse<T> {
  data: T;
  error?: string;
}

export interface DenomTraceResponse {
  denom_trace: {
    path: string;
    base_denom: string;
  };
}