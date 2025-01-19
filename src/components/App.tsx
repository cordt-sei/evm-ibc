import React, { useState, useEffect } from 'react';
import TokenList, { Token } from './TokenList';
import { fetchWalletBalances } from './api/fetchWalletBalances';
import { decodeDenom } from './api/decodeIbcDenom';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

interface AppProps {
  selectedToken: Token | null;
  setSelectedToken: React.Dispatch<React.SetStateAction<Token | null>>;
}

const App: React.FC<AppProps> = ({ selectedToken, setSelectedToken }) => {
  const [walletBalances, setWalletBalances] = useState<Token[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Dynamic SDK Context
  const { primaryWallet, setShowAuthFlow, handleLogOut } = useDynamicContext();
  const walletAddress = primaryWallet?.address;

  useEffect(() => {
    if (!walletAddress) return;

    const fetchBalances = async () => {
      setLoading(true);
      setError(null);

      try {
        const balances = await fetchWalletBalances(walletAddress);

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

        setWalletBalances(
          tokens.filter((token): token is Token => token !== null)
        );
      } catch (err) {
        setError('Failed to fetch wallet balances. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
  }, [walletAddress]);

  const handleTokenSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDenom = event.target.value;
    const token = walletBalances.find((t) => t.denom === selectedDenom);
    setSelectedToken(token || null);
  };

  return (
    <div>
      <h1>IBC Transfer UI</h1>

      {/* Wallet Connection */}
      {walletAddress ? (
        <div>
          <p>
            <strong>Connected Wallet:</strong> {walletAddress}
          </p>
          <button onClick={handleLogOut}>Log Out</button>
        </div>
      ) : (
        <div>
          <p>No wallet connected. Please connect a wallet.</p>
          <button onClick={() => setShowAuthFlow(true)}>Connect Wallet</button>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading wallet balances...</p>}

      {/* Token Dropdown */}
      {!loading && walletBalances.length > 0 && (
        <div>
          <h2>Select Token</h2>
          <select onChange={handleTokenSelection}>
            <option value="">-- Select a Token --</option>
            {walletBalances.map((token) => (
              <option key={token.denom} value={token.denom}>
                {token.baseDenom} ({token.amount})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Selected Token */}
      {selectedToken && (
        <div>
          <h3>Selected Token:</h3>
          <p>
            <strong>Base Denom:</strong> {selectedToken.baseDenom}
          </p>
          <p>
            <strong>Amount:</strong> {selectedToken.amount}
          </p>
        </div>
      )}

      {/* Transfer Form */}
      <TokenList setSelectedToken={setSelectedToken} />
    </div>
  );
};

export default App;
