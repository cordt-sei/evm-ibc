// src/config/dynamic.ts
import { DynamicConfig } from '../types';
import { createClient } from '@dynamic-labs/client';
import { CONFIG } from './config';
import { getEnvironmentConfig } from './environments';

const envConfig = getEnvironmentConfig(CONFIG.CHAIN_ID);

// Base configuration shared between client and provider
const baseConfig = {
  environmentId: CONFIG.ENVIRONMENT_ID,
  appName: 'IBC Return Transfer',
  appLogoUrl: '../assets/favicon.ico'
};

// Extended configuration for React provider
export const dynamicSettings: DynamicConfig = {
  ...baseConfig,
  walletConnectors: ['evmWallet'],
  evmNetworks: [{
    chainId: CONFIG.EVM_CHAIN_ID,
    name: envConfig.network.chainName,
    rpcUrl: CONFIG.RPC_URL,
    nativeCurrency: envConfig.network.nativeCurrency,
    blockExplorerUrls: envConfig.network.blockExplorerUrls
  }],
  storageKey: 'sei-ibc-transfer-auth',
  initializeOnMount: true,
  displaySiweStatement: false,
  walletConnectorOptions: {
    injected: {
      displayName: 'Sei Network Wallet',
      showAppLogoOnConnectingScreen: true,
      showAccountIconOnConnectingScreen: true,
      showBackButton: true
    }
  }
};

// Create and export Dynamic client instance
export const dynamicClient = createClient(baseConfig);

// Error handler for Dynamic client initialization
export function validateDynamicConfig() {
  if (!CONFIG.ENVIRONMENT_ID) {
    throw new Error('Dynamic environment ID is not set');
  }
}