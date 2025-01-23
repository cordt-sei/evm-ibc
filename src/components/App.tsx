import React, { useState, useEffect } from 'react';
import TokenList, { Token } from './TokenList';
import TransferForm from './TransferForm';
import WalletConnect from './WalletConnect';
import { fetchWalletBalances } from './api/fetchWalletBalances';
import { decodeDenom } from './api/decodeIbcDenom';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

const App: React.FC = () => {
  const [walletBalances, setWalletBalances] = useState<Token[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { primaryWallet } = useDynamicContext();
  const walletAddress = primaryWallet?.address;

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

  return (
    <div>
      <h1>IBC Transfer UI</h1>
      <WalletConnect />
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
