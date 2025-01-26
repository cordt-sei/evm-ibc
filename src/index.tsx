// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import App from './components/App';
import { CONFIG } from './config/config';
import { dynamicSettings, validateDynamicConfig } from './config/dynamic';
import './styles/globals.css';

// Validate Dynamic configuration
validateDynamicConfig();

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find root element');

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <DynamicContextProvider
      settings={{
        ...dynamicSettings,
        walletConnectors: [EthereumWalletConnectors]
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