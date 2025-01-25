// src/components/WalletConnect.tsx
import React, { useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

const WalletConnect: React.FC = () => {
  const [connecting, setConnecting] = useState(false);
  const {
    setShowAuthFlow,
    primaryWallet,
    handleLogOut,
    user
  } = useDynamicContext();

  const handleConnect = () => {
    setConnecting(true);
    try {
      setShowAuthFlow(true);
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await handleLogOut();
    } catch (error) {
      console.error('Disconnect error:', error);
    }
  };

  const formatAddress = (address: string): string => 
    address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg mb-4 bg-white">
      {!primaryWallet ? (
        <button
          onClick={handleConnect}
          disabled={connecting}
          className={`px-4 py-2 rounded text-white ${
            connecting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {connecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">Connected:</div>
            <div className="px-3 py-1 bg-gray-100 rounded-full text-sm font-mono">
              {formatAddress(primaryWallet.address)}
            </div>
            {primaryWallet.connector?.name && (
              <div className="text-sm text-gray-500">
                {primaryWallet.connector.name}
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
  );
};

export default WalletConnect;