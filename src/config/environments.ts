// src/config/environments.ts
export const environments = {
  mainnet: {
    rpcUrl: 'https://evm.sei.basementnodes.ca',
    chainId: 'atlantic-2',
    explorer: 'https://www.seiscan.app'
  },
  testnet: {
    rpcUrl: 'https://evm.testnet.sei.basementnodes.ca', 
    chainId: 'atlantic-2-testnet',
    explorer: 'https://testnet.seiscan.app'
  }
} as const;

export type Environment = keyof typeof environments;