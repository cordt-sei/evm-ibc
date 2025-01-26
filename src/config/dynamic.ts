// src/config/dynamic.ts
import { DynamicConfig } from '../types';
import { CONFIG } from './config';
import { getEnvironmentConfig } from './environments';

const envConfig = getEnvironmentConfig(CONFIG.CHAIN_ID);

export const dynamicSettings: DynamicConfig = {
  environmentId: CONFIG.ENVIRONMENT_ID,
  appName: 'IBC Return Transfer',
  appLogoUrl: 'https://sei.io/favicon.ico',
  walletConnectors: ['evmWallet'],
  evmNetworks: [{
    chainId: CONFIG.EVM_CHAIN_ID,
    name: envConfig.network.chainName,
    rpcUrl: CONFIG.RPC_URL
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