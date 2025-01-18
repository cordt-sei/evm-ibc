import React from 'react';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { CosmosWalletConnectors } from '@dynamic-labs/cosmos';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import WalletConnect from './WalletConnect';
import TokenList from './TokenList';
import TransferForm from './TransferForm';

const App = () => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: 'REPLACE-WITH-YOUR-ENVIRONMENT-ID', // Replace with your actual environment ID from Dynamic
        walletConnectors: [CosmosWalletConnectors, EthereumWalletConnectors],
      }}
    >
      <div>
        <h1>IBC Transfer UI</h1>
        <WalletConnect />
        <TokenList setSelectedToken={function (value: React.SetStateAction<{ denom: string; channel: string; baseDenom: string; amount: string; } | null>): void {
          throw new Error('Function not implemented.');
        } } />
        <TransferForm />
      </div>
    </DynamicContextProvider>
  );
};

export default App;
