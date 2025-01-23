// src/types/dynamic.ts
export interface DynamicConfig {
  environmentId: string;
  settings: {
    evmNetworks: Array<{
      chainId: number;
      name: string;
      rpcUrl: string;
    }>;
  };
}