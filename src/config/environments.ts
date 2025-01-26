// src/config/environments.ts
export interface Environment {
  rpcUrl: string;
  chainId: string;
  evmChainId: number;
  blockExplorer: string;
  api: {
    baseUrl: string;
    walletApi: string; // Added wallet API endpoint
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

export const environments: Record<'mainnet' | 'testnet' | 'devnet', Environment> = {
  mainnet: {
    rpcUrl: 'https://evm-rpc.sei.basementnodes.ca',
    chainId: 'pacific-1',
    evmChainId: 1329,
    blockExplorer: 'https://seitrace.com',
    api: {
      baseUrl: 'https://api.sei.basementnodes.ca',
      walletApi: 'https://wallet-api.sei.basementnodes.ca'
    },
    network: {
      chainName: 'Sei Network',
      nativeCurrency: {
        name: 'SEI',
        symbol: 'SEI',
        decimals: 6
      },
      blockExplorerUrls: [
        'https://seitrace.com',
        'https://seiscan.app',
        'https://seistream.app',
        'https://mintscan.io'
      ]
    }
  },
  testnet: {
    rpcUrl: 'https://evm-rpc-testnet.sei-apis.com',
    chainId: 'atlantic-2',
    evmChainId: 1328,
    blockExplorer: 'https://seitrace.com/?chain=atlantic-2',
    api: {
      baseUrl: 'https://rest-testnet.sei-apis.com',
      walletApi: 'https://wallet-api-testnet.sei.basementnodes.ca'
    },
    network: {
      chainName: 'Sei Testnet',
      nativeCurrency: {
        name: 'SEI',
        symbol: 'SEI',
        decimals: 6
      },
      blockExplorerUrls: [
        'https://seitrace.com/?chain=atlantic-2',
        'https://testnet.seistream.app',
        'https://seiscan.app/atlantic-2'
      ]
    }
  },
  devnet: {
    rpcUrl: 'https://evm-rpc-arctic-1.sei-apis.com',
    chainId: 'arctic-1',
    evmChainId: 713715,
    blockExplorer: 'https://seitrace.com/?chain=arctic-1',
    api: {
      baseUrl: 'https://rest-arctic-1.sei-apis.com',
      walletApi: 'https://wallet-api-devnet.sei.basementnodes.ca'
    },
    network: {
      chainName: 'Sei Devtnet',
      nativeCurrency: {
        name: 'SEI',
        symbol: 'SEI',
        decimals: 6
      },
      blockExplorerUrls: [
        'https://seitrace.com/?chain=arctic-1',
        'https://devnet.seistream.app',
      ]
    }
  }
} as const;

export type EnvironmentType = keyof typeof environments;

// Helper to get environment information
export function getEnvironmentConfig(chainId: string): Environment {
  switch (chainId) {
    case 'pacific-1':
      return environments.mainnet;
    case 'atlantic-2':
      return environments.testnet;
    case 'arctic-1':
      return environments.devnet;
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`);
  }
}

// Helper to get environment by EVM chain ID
export function getEnvironmentByEvmChainId(evmChainId: number): Environment {
  const env = Object.values(environments).find(e => e.evmChainId === evmChainId);
  if (!env) {
    throw new Error(`Unsupported EVM chain ID: ${evmChainId}`);
  }
  return env;
}