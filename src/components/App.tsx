// src/components/App.tsx
import React, { useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import TokenList from './TokenList';
import TransferForm from './TransferForm';
import WalletConnect from './WalletConnect';
import { useIBCTokens } from '../hooks/useIBCTokens';
import type { IBCToken } from '../types';

const App: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState<IBCToken | null>(null);
  const { primaryWallet } = useDynamicContext();
  const walletAddress = primaryWallet?.address || '';
  const { tokens, loading, error } = useIBCTokens(walletAddress);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">IBC Return Transfer</h1>
          <p className="text-gray-600">Return IBC tokens to their origin chains</p>
          <div className="mt-6">
            <WalletConnect />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <TokenList 
                tokens={tokens} 
                isLoading={loading} 
                error={error} 
                setSelectedToken={setSelectedToken}
              />
            </div>
          </div>

          {selectedToken && walletAddress && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Return Token</h2>
                <TransferForm 
                  selectedToken={selectedToken} 
                  walletAddress={walletAddress} 
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;