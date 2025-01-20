// TokenList.tsx
import React from 'react';

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
