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
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            IBC Return Transfer
          </h1>
          <WalletConnect />
        </header>
        
        <main>
          <TokenList 
            tokens={tokens} 
            isLoading={loading} 
            error={error} 
            setSelectedToken={setSelectedToken}
          />
          {selectedToken && walletAddress && (
            <div className="mt-6">
              <TransferForm 
                selectedToken={selectedToken} 
                walletAddress={walletAddress} 
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;