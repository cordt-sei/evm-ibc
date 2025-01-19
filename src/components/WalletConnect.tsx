import React, { useState, useEffect } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

const WalletConnect = () => {
  const { primaryWallet, user, sdkHasLoaded } = useDynamicContext();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    if (primaryWallet) {
      setWalletAddress(primaryWallet.address || null);
    } else {
      setWalletAddress(null);
    }
  }, [primaryWallet]);

  const handleAuthModal = () => {
    if (window.dynamicClient && window.dynamicClient.ui) {
      window.dynamicClient.ui.auth.show();
    } else {
      alert('Dynamic client is not properly initialized.');
    }
  };

  const handleUserProfileModal = () => {
    if (window.dynamicClient && window.dynamicClient.ui) {
      window.dynamicClient.ui.userProfile.show();
    } else {
      alert('Dynamic client is not properly initialized.');
    }
  };

  return (
    <div>
      <h2>Wallet Connection</h2>
      <p>
        <strong>SDK Loaded:</strong> {sdkHasLoaded ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>Connected Wallet:</strong>{' '}
        {walletAddress || 'No wallet connected'}
      </p>
      <p>
        <strong>Connected User:</strong>{' '}
        {user ? user.email : 'No user connected'}
      </p>
      <button onClick={handleAuthModal} style={{ marginRight: '10px' }}>
        Connect Wallet
      </button>
      <button onClick={handleUserProfileModal}>View Profile</button>
    </div>
  );
};

export default WalletConnect;
