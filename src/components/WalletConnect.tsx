// src/components/WalletConnect.tsx
import React, { useState, useCallback } from 'react';
import { useDynamicContext, useIsLoggedIn } from '@dynamic-labs/sdk-react-core';

// This component handles wallet connection using Dynamic Labs' SDK
const WalletConnect: React.FC = () => {
  // Track the local connecting state for UI feedback
  const [connecting, setConnecting] = useState(false);
  
  // Get necessary functions and state from Dynamic context
  const {
    setShowAuthFlow,
    primaryWallet,
    handleLogOut
  } = useDynamicContext();
  
  // Get login state directly from Dynamic
  const isLoggedIn = useIsLoggedIn();

  // Handle the connect button click
  const handleConnect = useCallback(async () => {
    setConnecting(true);
    try {
      // Open the Dynamic auth flow
      setShowAuthFlow(true);
    } catch (error) {
      console.error('Failed to open wallet connection flow:', error);
    } finally {
      setConnecting(false);
    }
  }, [setShowAuthFlow]);

  // Handle the disconnect button click
  const handleDisconnect = useCallback(async () => {
    try {
      await handleLogOut();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  }, [handleLogOut]);

  // Format address for display by truncating middle portion
  const formatAddress = (address: string): string => {
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Render different content based on connection state
  return (
    <div className="wallet-connect p-4 border rounded-lg mb-4">
      {!isLoggedIn || !primaryWallet ? (
        // Show connect button when not connected
        <button
          onClick={handleConnect}
          disabled={connecting}
          className={`px-4 py-2 rounded text-white ${
            connecting 
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {connecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        // Show wallet info and disconnect button when connected
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm mr-2">Connected:</span>
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">
              {formatAddress(primaryWallet.address)}
            </span>
          </div>
          <button
            onClick={handleDisconnect}
            className="ml-4 px-4 py-2 text-sm text-red-600 hover:text-red-700"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;