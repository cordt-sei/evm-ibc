// src/components/TokenList.tsx
import React from 'react';
import { IBCToken } from '../types';
import { getTokenDisplayInfo } from '../utils/tokenDisplay';

interface TokenListProps {
  tokens: IBCToken[];
  isLoading: boolean;
  error: string | null;
  setSelectedToken: (token: IBCToken) => void;
}

const TokenList: React.FC<TokenListProps> = ({
  tokens,
  isLoading,
  error,
  setSelectedToken,
}) => (
  <div>
    <h2>Returnable IBC Tokens</h2>
    {isLoading ? (
      <p>Loading tokens...</p>
    ) : error ? (
      <p className="error">{error}</p>
    ) : tokens.length === 0 ? (
      <p>No returnable IBC tokens found</p>
    ) : (
      <ul>
        {tokens.map((token, index) => {
          const { symbol, originChain } = getTokenDisplayInfo(token);
          return (
            <li key={index} onClick={() => setSelectedToken(token)}>
              {symbol} - {token.balance}
              <div className="token-info">
                <small>Origin: {originChain}</small>
                <small>Channel: {token.channel}</small>
              </div>
            </li>
          );
        })}
      </ul>
    )}
  </div>
);

export default TokenList;