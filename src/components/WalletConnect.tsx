// WalletConnect.tsx

import React from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { dynamicClient } from './api/dynamicClient'; // Import the dynamicClient

const WalletConnect = () => {
  const { primaryWallet, user } = useDynamicContext();

  const handleConnect = async () => {
    try {
      await dynamicClient.ui.auth.show();
      console.log('Wallet connected:', primaryWallet?.address);
    } catch (err) {
      console.error('Failed to connect wallet:', err);
    }
  };

  const handleDisconnect = async () => {
    try {
      await dynamicClient.ui.auth.hide();
      console.log('Wallet disconnected');
    } catch (err) {
      console.error('Failed to disconnect wallet:', err);
    }
  };

  return (
    <div>
      <h2>Wallet Connection</h2>
      <p>
        <strong>Connected Wallet:</strong>{' '}
        {primaryWallet ? primaryWallet.address : 'No wallet connected'}
      </p>
      <p>
        <strong>Connected User:</strong>{' '}
        {user ? user.email : 'No user connected'}
      </p>
      <button onClick={handleConnect}>Connect Wallet</button>
      <button onClick={handleDisconnect}>Disconnect Wallet</button>
    </div>
  );
};

export default WalletConnect;
