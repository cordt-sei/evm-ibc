import React, { useEffect } from 'react';
import { useDynamicContext, useIsLoggedIn, isAuthenticatedWithAWallet, UserProfile, useReinitialize } from '@dynamic-labs/sdk-react-core';

const WalletConnect = () => {
  const { primaryWallet, setShowAuthFlow, handleLogOut, user, sdkHasLoaded } = useDynamicContext();
  const isLoggedIn = useIsLoggedIn();
  const authenticatedWithAWallet = user ? isAuthenticatedWithAWallet(user as UserProfile) : false;
  const reinitialize = useReinitialize();

  const handleConnect = async () => {
    if (!sdkHasLoaded) {
      console.warn('SDK is still loading. Please wait.');
      return;
    }

    try {
      console.log('Attempting to open wallet connection flow...');
      setShowAuthFlow(true); // Opens the sign-in flow.
    } catch (error) {
      console.error('Error during wallet connection flow:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      console.log('Logging out...');
      await handleLogOut();
      console.log('Wallet disconnected.');
    } catch (error) {
      console.error('Error during wallet disconnection:', error);
    }
  };

  useEffect(() => {
    if (!sdkHasLoaded) {
      console.warn('SDK not loaded. Attempting to reinitialize...');
      reinitialize();
    }
  }, [sdkHasLoaded, reinitialize]);

  useEffect(() => {
    if (!sdkHasLoaded) {
      console.warn('SDK is still initializing...');
      return;
    }

    console.log('SDK has loaded.');

    if (isLoggedIn) {
      console.log('User is logged in:', user);
    } else if (authenticatedWithAWallet) {
      console.log('User is authenticated but not fully logged in:', user);
    } else {
      console.log('No wallet connected.');
    }

    if (primaryWallet) {
      console.log('Primary wallet connected:', primaryWallet.address);
    } else {
      console.log('No wallet connected.');
    }
  }, [sdkHasLoaded, isLoggedIn, authenticatedWithAWallet, primaryWallet, user]);

  return (
    <div>
      <h2>Wallet Connection</h2>
      {sdkHasLoaded ? (
        <>
          <p>
            <strong>Connected Wallet:</strong>{' '}
            {primaryWallet ? primaryWallet.address : 'No wallet connected'}
          </p>
          {!isLoggedIn && !primaryWallet && (
            <button onClick={handleConnect}>Connect Wallet</button>
          )}
          {primaryWallet && (
            <button onClick={handleDisconnect}>Disconnect Wallet</button>
          )}
        </>
      ) : (
        <p>Loading SDK...</p>
      )}
    </div>
  );
};

export default WalletConnect;
