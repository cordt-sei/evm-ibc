import React, { useEffect, useState } from 'react';
import { decodeDenom } from './api/decodeIbcDenom';
import { fetchWalletBalances } from './api/fetchWalletBalances';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

type Token = {
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
  const { user } = useDynamicContext();
  const walletAddress = user?.address || user?.address;

  useEffect(() => {
    const fetchTokens = async () => {
      if (!walletAddress) {
        console.warn('Wallet address is missing or invalid.');
        return;
      }

      try {
        const balances = await fetchWalletBalances(walletAddress);
        const tokens = await Promise.all(
          balances.map(async (balance) => {
            try {
              const { channel, baseDenom } = await decodeDenom(balance.denom);
              return { denom: balance.denom, channel, baseDenom, amount: balance.amount };
            } catch (err) {
              console.error(`Error decoding denom for ${balance.denom}:`, err);
              return null;
            }
          }),
        );

        // Filter out null values and set tokens
        setTokens(tokens.filter((token): token is Token => token !== null));

        // Automatically select the first token
        if (tokens.length > 0) {
          setSelectedToken(tokens[0]);
        }
      } catch (err) {
        console.error('Error fetching wallet balances:', err);
      }
    };

    fetchTokens();
  }, [walletAddress, setSelectedToken]);

  return (
    <div>
      <h2>Token List</h2>
      <ul>
        {tokens.length === 0 ? (
          <li>No tokens found</li>
        ) : (
          tokens.map((token, index) => (
            <li key={index}>
              {token.baseDenom} ({token.amount}) - Channel: {token.channel}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TokenList;
