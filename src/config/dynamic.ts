// src/config/dynamic.ts
import type { DynamicConfig } from '../types';

if (!process.env.REACT_APP_ENVIRONMENT_ID) {
  throw new Error('REACT_APP_ENVIRONMENT_ID must be set in .env file');
}

export const dynamicSettings: DynamicConfig = {
  environmentId: process.env.REACT_APP_ENVIRONMENT_ID,
  appName: 'IBC Return Transfer',
  appLogoUrl: 'https://sei.io/favicon.ico',
  walletConnectors: ['evmWallet'],
  evmNetworks: [{
    chainId: 38,
    name: 'Sei EVM',
    rpcUrl: process.env.REACT_APP_SEI_RPC_URL || 'https://evm-rpc.sei-apis.com'
  }],
  storageKey: 'sei-ibc-transfer-auth'
};