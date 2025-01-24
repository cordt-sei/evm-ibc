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
    <div>
      <h1>IBC Return Transfer</h1>
      <WalletConnect />
      {error && <p className="error">{error}</p>}
      <TokenList 
        tokens={tokens} 
        isLoading={loading} 
        error={error} 
        setSelectedToken={setSelectedToken}
      />
      {selectedToken && walletAddress && (
        <TransferForm 
          selectedToken={selectedToken} 
          walletAddress={walletAddress} 
        />
      )}
    </div>
  );
};

export default App;