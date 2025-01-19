import React, { useEffect, useState } from 'react';
import { decodeDenom } from './api/decodeIbcDenom';
import { fetchWalletBalances } from './api/fetchWalletBalances';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

export type Token = {
  denom: string;
  channel: string;
  baseDenom: string;
  amount: string;
};

const TokenList = ({
  setSelectedToken,
}: {
  setSelectedToken: React.Dispatch<React.SetStateAction<Token | null>>;
}) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { primaryWallet } = useDynamicContext();
  const walletAddress = primaryWallet?.address;

  useEffect(() => {
    console.log('Wallet Address:', walletAddress);
  }, [walletAddress]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchTokens = async () => {
      if (!walletAddress) {
        setError('No wallet address detected.');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const balances = await fetchWalletBalances('walletAddress');

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
              console.error(`Error decoding denom for ${balance.denom}:`, err);
              return null;
            }
          })
        );

        setTokens(tokens.filter((token): token is Token => token !== null));
        if (tokens.length > 0) {
          setSelectedToken(tokens[0]);
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error('Failed to fetch tokens:', err.message);
          setError(err.message || 'Failed to fetch tokens. Please try again.');
        } else {
          console.error('Unexpected error:', err);
          setError('An unknown error occurred. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokens();

    return () => {
      abortController.abort(); // Clean up by aborting the fetch
    };
  }, [walletAddress, setSelectedToken]);

  return (
    <div>
      <h2>Token List</h2>
      {isLoading ? (
        <p>Loading tokens...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : tokens.length === 0 ? (
        <p>No tokens found</p>
      ) : (
        <ul>
          {tokens.map((token, index) => (
            <li key={index}>
              {token.baseDenom} ({token.amount}) - Channel: {token.channel}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TokenList;
