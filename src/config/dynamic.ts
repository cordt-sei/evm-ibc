// src/config/dynamic.ts
import type { DynamicSettings, EVMNetwork } from '../types/dynamic';
import { CONFIG } from './config';

const networkConfig: EVMNetwork = {
  chainId: CONFIG.EVM_CHAIN_ID,
  name: CONFIG.NETWORK.NAME,
  rpcUrl: CONFIG.RPC_URL,
  nativeCurrency: CONFIG.NETWORK.NATIVE_CURRENCY,
  blockExplorerUrls: CONFIG.NETWORK.BLOCK_EXPLORER_URLS
};

export const dynamicSettings: DynamicSettings = {
  environmentId: CONFIG.ENVIRONMENT_ID,
  appName: 'IBC Return Transfer',
  walletConnectors: ['evmWallet'],
  evmNetworks: [networkConfig],
  initializeOnMount: true,
  displaySiweStatement: false,
  storageKey: 'sei-ibc-transfer-auth',
  walletConnectorOptions: {
    injected: {
      displayName: 'Sei Network Wallet',
      showAppLogoOnConnectingScreen: true,
      showAccountIconOnConnectingScreen: true,
      showBackButton: true
    }
  }
};

export function validateDynamicConfig(): void {
  if (!CONFIG.ENVIRONMENT_ID) {
    throw new Error('Dynamic environment ID is not set');
  }
}