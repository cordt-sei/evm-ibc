// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import App from './components/App';
import { API_CONFIG } from './config';

const root = createRoot(document.getElementById('root')!);

const dynamicSettings = {
  environmentId: process.env.REACT_APP_ENVIRONMENT_ID || '',
  appName: 'IBC Return Transfer',
  appLogoUrl: 'https://sei.io/favicon.ico',
  evmNetworks: [{
    chainId: parseInt(process.env.REACT_APP_CHAIN_ID || '0', 16),
    name: 'Sei EVM',
    rpcUrl: process.env.REACT_APP_SEI_RPC_URL || ''
  }]
};

root.render(
  <React.StrictMode>
    <DynamicContextProvider settings={dynamicSettings}>
      <App />
    </DynamicContextProvider>
  </React.StrictMode>
);