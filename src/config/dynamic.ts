// src/config/dynamic.ts
import { DynamicConfig } from '../types';
import { createClient, type ClientProps } from '@dynamic-labs/client';
import { CONFIG } from './config';
import { getEnvironmentConfig } from './environments';

// Validate Dynamic config before initialization
validateDynamicConfig();

const envConfig = getEnvironmentConfig(CONFIG.CHAIN_ID);

// Type for the base configuration
interface BaseConfig extends Pick<ClientProps, 'environmentId' | 'appName' | 'appLogoUrl'> {
  environmentId: string;
  appName: string;
  appLogoUrl: string;
}

// Base configuration shared between client and provider
const baseConfig: BaseConfig = {
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

// Error handler for Dynamic client initialization
export function validateDynamicConfig(): void {
  if (!CONFIG.ENVIRONMENT_ID) {
    throw new Error('Dynamic environment ID is not set');
  }
}

// Create and export Dynamic client instance
export const dynamicClient = createClient(baseConfig);