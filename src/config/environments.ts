// src/config/environments.ts
// Define the environment configuration structure with strict types
export interface Environment {
  rpcUrl: string;
  chainId: string;
  blockExplorer: string;
  api: {
    baseUrl: string;
  };
}

// Environment configurations with combined API and blockchain settings
export const environments: Record<'mainnet' | 'testnet', Environment> = {
  mainnet: {
    rpcUrl: 'https://evm.sei.basementnodes.ca',
    chainId: 'atlantic-2',
    blockExplorer: 'https://www.seiscan.app',
    api: {
      baseUrl: 'https://api.sei.basementnodes.ca'
    }
  },
  testnet: {
    rpcUrl: 'https://evm.testnet.sei.basementnodes.ca',
    chainId: 'atlantic-2-testnet',
    blockExplorer: 'https://testnet.seiscan.app',
    api: {
      baseUrl: 'https://api.testnet.sei.basementnodes.ca'
    }
  }
} as const;

// Type for environment keys
export type EnvironmentType = keyof typeof environments;