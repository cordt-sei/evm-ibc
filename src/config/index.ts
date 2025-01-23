// src/config/index.ts
export const API_CONFIG = {
  BASE_URL: 'https://api.sei.basementnodes.ca',
  IBC_PRECOMPILE: '0x0000000000000000000000000000001009',
  DEFAULT_GAS_LIMIT: BigInt(2000000),
  TIMEOUT_MINUTES: 10,
  BLOCK_TIME_SECONDS: 0.4
 };
 
 // src/config/providers.ts
 import { JsonRpcProvider } from 'ethers';
 
 export const provider = new JsonRpcProvider(process.env.REACT_APP_SEI_RPC_URL);
 
 // src/config/environments.ts
 interface Environment {
  rpcUrl: string;
  chainId: string;
  blockExplorer: string;
 }
 
 export const environments: Record<string, Environment> = {
  mainnet: {
    rpcUrl: 'https://evm.sei.basementnodes.ca',
    chainId: 'atlantic-2',
    blockExplorer: 'https://www.seiscan.app'
  },
  testnet: {
    rpcUrl: 'https://evm.testnet.sei.basementnodes.ca',
    chainId: 'atlantic-2-testnet',
    blockExplorer: 'https://testnet.seiscan.app'
  }
 };
 
 // src/config/dynamicClient.ts
 import { createClient } from '@dynamic-labs/client';
 
 export const dynamicClient = createClient({
  environmentId: process.env.REACT_APP_ENVIRONMENT_ID || '',
  appLogoUrl: 'https://sei.io/favicon.ico',
  appName: 'IBC Return Transfer'
 });