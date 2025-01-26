// src/types/dynamic.ts
export interface DynamicConfig {
  environmentId: string;
  appName: string;
  appLogoUrl: string;
  walletConnectors: string[];
  evmNetworks: Array<{
    chainId: number;
    name: string;
    rpcUrl: string;
  }>;
  storageKey?: string;
}