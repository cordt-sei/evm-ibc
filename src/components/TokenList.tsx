// TokenList.tsx
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
  tokens,
  isLoading,
  error,
  setSelectedToken,
}: {
  tokens: Token[];
  isLoading: boolean;
  error: string | null;
  setSelectedToken: React.Dispatch<React.SetStateAction<Token | null>>;
}) => {
  const [internalTokens, setInternalTokens] = useState<Token[]>(tokens);
  const [internalLoading, setInternalLoading] = useState(isLoading);
  const [internalError, setInternalError] = useState<string | null>(error);

  const { primaryWallet } = useDynamicContext();
  const walletAddress = primaryWallet?.address;

  useEffect(() => {
    if (!walletAddress) {
      setInternalError('No wallet address detected.');
      return;
    }

    const abortController = new AbortController();

    const fetchTokens = async () => {
      setInternalLoading(true);
      setInternalError(null);

      try {
        console.log('Fetching balances for wallet:', walletAddress);
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
              console.error(`Error decoding denom for ${balance.denom}:`, err);
              return null;
            }
          })
        );

        const filteredTokens = tokens.filter((token): token is Token => token !== null);
        setInternalTokens(filteredTokens);
        if (filteredTokens.length > 0) {
          setSelectedToken(filteredTokens[0]);
        }
      } catch (err) {
        console.error('Failed to fetch tokens:', err);
        setInternalError('Failed to fetch tokens. Please try again.');
      } finally {
        setInternalLoading(false);
      }
    };

    fetchTokens();

    return () => {
      abortController.abort();
    };
  }, [walletAddress, setSelectedToken]);

  return (
    <div>
      <h2>Token List</h2>
      {internalLoading ? (
        <p>Loading tokens...</p>
      ) : internalError ? (
        <p style={{ color: 'red' }}>{internalError}</p>
      ) : internalTokens.length === 0 ? (
        <p>No tokens found</p>
      ) : (
        <ul>
          {internalTokens.map((token, index) => (
            <li
              key={index}
              onClick={() => setSelectedToken(token)}
              style={{ cursor: 'pointer' }}
            >
              {token.baseDenom} ({token.amount}) - Channel: {token.channel}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TokenList;
