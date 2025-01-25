// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import App from './components/App';
import './styles/globals.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find root element');

const root = createRoot(rootElement);

const ENVIRONMENT_ID = '5b99a3f2-fb21-448b-8d2c-84c2bae6bf57';

const settings = {
  environmentId: ENVIRONMENT_ID,
  appName: 'IBC Return Transfer',
  appLogoUrl: 'https://sei.io/favicon.ico',
  walletConnectors: [EthereumWalletConnectors],
  evmNetworks: [{
    chainId: 38,
    name: 'Sei EVM',
    rpcUrl: process.env.REACT_APP_SEI_RPC_URL || 'https://evm-rpc.sei.basementnodes.ca'
  }]
};

root.render(
  <React.StrictMode>
    <DynamicContextProvider settings={settings}>
      <App />
    </DynamicContextProvider>
  </React.StrictMode>
);