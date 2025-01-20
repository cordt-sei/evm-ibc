// App.tsx

import React, { useState, useEffect } from 'react';
import TokenList, { Token } from './TokenList';
import TransferForm from './TransferForm';
import { fetchWalletBalances } from './api/fetchWalletBalances';
import { decodeDenom } from './api/decodeIbcDenom';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

const App: React.FC = () => {
  const [walletBalances, setWalletBalances] = useState<Token[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { primaryWallet, setShowAuthFlow, handleLogOut } = useDynamicContext();
  const walletAddress = primaryWallet?.address;

  useEffect(() => {
    const environmentId = process.env.REACT_APP_ENVIRONMENT_ID;
    if (!environmentId) {
      console.error('Environment ID is not set. Dynamic SDK may not work correctly.');
    } else {
      console.log('Using environment ID:', environmentId);
    }
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log('Wallet connected:', walletAddress);
      setWalletConnected(true);
    } else {
      setWalletConnected(false);
    }
  }, [walletAddress]);

  useEffect(() => {
    if (!walletConnected) return;

    const fetchBalances = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('Fetching balances for wallet:', walletAddress);
        const balances = await fetchWalletBalances(walletAddress!);

        const tokens = await Promise.all(
          balances.map(async (balance) => {
            try {
              const { channel, baseDenom } = await decodeDenom(balance.denom);
              return {
                denom: balance.denom,
                channel,
                baseDenom,
                amount: balance.amount,
              };
            } catch (err) {
              console.error(`Error decoding denom: ${balance.denom}`, err);
              return null;
            }
          })
        );

        const filteredTokens = tokens.filter((token): token is Token => token !== null);
        setWalletBalances(filteredTokens);
        if (filteredTokens.length > 0) {
          setSelectedToken(filteredTokens[0]);
        }
      } catch (err) {
        console.error('Error fetching balances:', err);
        setError('Failed to fetch balances. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
  }, [walletConnected, walletAddress]);

  const handleConnectWallet = async () => {
    try {
      console.log('Opening wallet connection...');
      setShowAuthFlow(true);
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError('Failed to connect wallet. Please try again.');
    }
  };

  return (
    <div>
      <h1>IBC Transfer UI</h1>
      {walletConnected ? (
        <div>
          <p>
            <strong>Connected Wallet:</strong> {walletAddress}
          </p>
          <button onClick={handleLogOut}>Log Out</button>
        </div>
      ) : (
        <div>
          <p>No wallet connected. Please connect a wallet.</p>
          <button onClick={handleConnectWallet}>Connect Wallet</button>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading wallet balances...</p>}
      <TokenList tokens={walletBalances} isLoading={loading} error={error} setSelectedToken={setSelectedToken} />
      {selectedToken && walletAddress && (
        <TransferForm selectedToken={selectedToken} walletAddress={walletAddress} />
      )}
    </div>
  );
};

export default App;
