// src/components/App.tsx
import React, { useState, Suspense } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useIBCTokens } from '../hooks/useIBCTokens';
import type { IBCToken } from '../types';
import { CONFIG } from '../config/config';
import { getEnvironmentConfig } from '../config/environments';

// Lazy load components
const TokenList = React.lazy(() => import(
  /* webpackChunkName: "token-list" */ 
  './TokenList'
));

const TransferForm = React.lazy(() => import(
  /* webpackChunkName: "transfer-form" */
  './TransferForm'
));

const WalletConnect = React.lazy(() => import(
  /* webpackChunkName: "wallet-connect" */
  './WalletConnect'
));

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        Something went wrong. Please refresh the page.
      </div>
    );
  }

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

const App: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState<IBCToken | null>(null);
  const { primaryWallet } = useDynamicContext();
  const walletAddress = primaryWallet?.address || '';
  const { tokens, loading, error, refetch } = useIBCTokens(walletAddress);
  
  const envConfig = getEnvironmentConfig(CONFIG.CHAIN_ID);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {CONFIG.NETWORK.NAME} IBC Return Transfer
          </h1>
          <p className="text-gray-600">
            Return IBC tokens to their origin chains
          </p>
          <div className="mt-6">
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <WalletConnect />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner />}>
                  <TokenList 
                    tokens={tokens} 
                    isLoading={loading} 
                    error={error}
                    setSelectedToken={setSelectedToken}
                    onRefresh={refetch}
                  />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>

          {selectedToken && walletAddress && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Return Token
                </h2>
                <ErrorBoundary>
                  <Suspense fallback={<LoadingSpinner />}>
                    <TransferForm 
                      selectedToken={selectedToken} 
                      walletAddress={walletAddress} 
                    />
                  </Suspense>
                </ErrorBoundary>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Network: {envConfig.network.chainName} ({CONFIG.CHAIN_ID})
          </p>
          <p className="mt-1">
            <a 
              href={CONFIG.BLOCK_EXPLORER}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              View Block Explorer
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;