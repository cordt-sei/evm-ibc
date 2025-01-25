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
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Returnable IBC Tokens</h2>
    {isLoading ? (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    ) : error ? (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    ) : tokens.length === 0 ? (
      <div className="bg-gray-50 text-gray-600 p-4 rounded-lg">
        No returnable IBC tokens found
      </div>
    ) : (
      <div className="space-y-3">
        {tokens.map((token, index) => {
          const { symbol, originChain } = getTokenDisplayInfo(token);
          return (
            <div
              key={index}
              onClick={() => setSelectedToken(token)}
              className="group border border-gray-200 hover:border-blue-400 rounded-lg p-4 cursor-pointer transition-all hover:shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-lg font-medium text-gray-900 group-hover:text-blue-600">{symbol}</span>
                  <div className="space-y-1 mt-2">
                    <p className="text-sm text-gray-600">Channel: {token.channel}</p>
                    <p className="text-sm text-gray-600">Origin: {originChain}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-gray-100 px-3 py-1 rounded-lg text-gray-900 font-mono text-sm">
                    {parseInt(token.balance).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

export default TokenList;