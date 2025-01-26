// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import App from './components/App';
import { dynamicSettings } from './config/dynamic';
import './styles/globals.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find root element');

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <DynamicContextProvider
      settings={{
        ...dynamicSettings,
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <App />
    </DynamicContextProvider>
  </React.StrictMode>
);