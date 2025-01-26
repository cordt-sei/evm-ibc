// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import App from './components/App';
import { CONFIG } from './config/config';
import { getEnvironmentConfig } from './config/environments';
import './styles/globals.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find root element');

const root = createRoot(rootElement);
const envConfig = getEnvironmentConfig(CONFIG.CHAIN_ID);

root.render(
  <React.StrictMode>
    <DynamicContextProvider
      settings={{
        environmentId: CONFIG.ENVIRONMENT_ID,
        appName: CONFIG.NETWORK.NAME,
        walletConnectors: [EthereumWalletConnectors],
        evmNetworks: [{
          chainId: CONFIG.EVM_CHAIN_ID,
          name: envConfig.network.chainName,
          rpcUrl: CONFIG.RPC_URL,
          nativeCurrency: envConfig.network.nativeCurrency,
          blockExplorerUrls: envConfig.network.blockExplorerUrls
        }],
        initializeOnMount: true,
        displaySiweStatement: false,
        walletConnectorOptions: {
          injected: {
            displayName: 'Browser Wallet',
            showAppLogoOnConnectingScreen: true,
            showAccountIconOnConnectingScreen: true,
            showBackButton: true
          }
        }
      }}
      onAuthSuccess={(args) => {
        console.log('Auth success:', args);
      }}
      onAuthError={(error) => {
        console.error('Auth error:', error);
      }}
      onLogout={() => {
        console.log('Logged out');
      }}
    >
      <App />
    </DynamicContextProvider>
  </React.StrictMode>
);