// src/components/WalletConnect.tsx
import React, { useState, useEffect } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { CONFIG } from '../config/config';
import { getEnvironmentConfig } from '../config/environments';

const WalletConnect: React.FC = () => {
  const [connecting, setConnecting] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);
  
  const {
    setShowAuthFlow,
    primaryWallet,
    handleLogOut,
    isAuthenticated,
    networkConfigurations
  } = useDynamicContext();

  useEffect(() => {
    const checkNetwork = async () => {
      if (primaryWallet?.connector?.name) {
        const currentChainId = networkConfigurations?.evmNetwork?.chainId;
        if (currentChainId && currentChainId !== CONFIG.EVM_CHAIN_ID) {
          setNetworkError(
            `Please switch to ${CONFIG.NETWORK.NAME} (Chain ID: ${CONFIG.EVM_CHAIN_ID})`
          );
        } else {
          setNetworkError(null);
        }
      }
    };

    checkNetwork();
  }, [primaryWallet, networkConfigurations]);

  const handleConnect = () => {
    setConnecting(true);
    try {
      setShowAuthFlow(true);
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await handleLogOut();
      setNetworkError(null);
    } catch (error) {
      console.error('Disconnect error:', error);
    }
  };

  const formatAddress = (address: string): string => 
    address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  // Reset connecting state when authentication status changes
  useEffect(() => {
    if (isAuthenticated) {
      setConnecting(false);
    }
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
        {!isAuthenticated ? (
          <button
            onClick={handleConnect}
            disabled={connecting}
            className={`px-4 py-2 rounded text-white ${
              connecting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {connecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">Connected:</div>
              <div className="px-3 py-1 bg-gray-100 rounded-full text-sm font-mono">
                {formatAddress(primaryWallet?.address || '')}
              </div>
              {primaryWallet?.connector?.name && (
                <div className="text-sm text-gray-500">
                  via {primaryWallet.connector.name}
                </div>
              )}
            </div>
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 text-sm text-red-600 hover:text-red-700"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
      
      {networkError && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
          {networkError}
        </div>
      )}
    </div>
  );
};

export default WalletConnect;