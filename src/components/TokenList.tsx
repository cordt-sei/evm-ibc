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
  <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Returnable IBC Tokens</h2>
    {isLoading ? (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    ) : error ? (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
        {error}
      </div>
    ) : tokens.length === 0 ? (
      <div className="bg-gray-50 rounded-md p-4 text-gray-600">
        No returnable IBC tokens found in this wallet
      </div>
    ) : (
      <div className="space-y-4">
        {tokens.map((token, index) => {
          const { symbol, originChain } = getTokenDisplayInfo(token);
          return (
            <div
              key={index}
              onClick={() => setSelectedToken(token)}
              className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-lg text-gray-900">{symbol}</div>
                  <div className="text-gray-500 text-sm mt-1">Channel: {token.channel}</div>
                  <div className="text-gray-500 text-sm">Origin: {originChain}</div>
                </div>
                <div className="text-right font-mono bg-gray-50 px-3 py-1 rounded">
                  {parseInt(token.balance).toLocaleString()}
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