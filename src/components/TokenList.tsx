// src/components/TokenList.tsx
import React from 'react';
import { IBCToken } from '../types';
import { getTokenDisplayInfo, getTokenExplorerUrl } from '../utils/tokenDisplay';
import { CONFIG } from '../config/config';

interface TokenListProps {
  tokens: IBCToken[];
  isLoading: boolean;
  error: string | null;
  setSelectedToken: (token: IBCToken) => void;
  onRefresh: () => void;
}

const TokenList: React.FC<TokenListProps> = ({
  tokens,
  isLoading,
  error,
  setSelectedToken,
  onRefresh
}) => {
  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    onRefresh();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Returnable IBC Tokens
        </h2>
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="text-blue-500 hover:text-blue-600 text-sm"
        >
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      ) : tokens.length === 0 ? (
        <div className="bg-gray-50 text-gray-600 p-4 rounded-lg text-center">
          No returnable IBC tokens found
        </div>
      ) : (
        <div className="space-y-3">
          {tokens.map((token, index) => {
            const { symbol, originChain, displayAmount, channel } = getTokenDisplayInfo(token);
            const explorerUrl = getTokenExplorerUrl(token);
            
            return (
              <div
                key={index}
                onClick={() => setSelectedToken(token)}
                className="group border border-gray-200 hover:border-blue-400 rounded-lg p-4 cursor-pointer transition-all hover:shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
                      {symbol}
                    </span>
                    <div className="space-y-1 mt-2">
                      <p className="text-sm text-gray-600">
                        Channel: {channel}
                      </p>
                      <p className="text-sm text-gray-600">
                        Origin: {originChain}
                      </p>
                      {explorerUrl && (
                        <a 
                          href={explorerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
                        >
                          View in Explorer
                          <svg 
                            className="w-4 h-4" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-gray-100 px-3 py-1 rounded-lg text-gray-900 font-mono text-sm">
                      {displayAmount}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {CONFIG.NETWORK.NATIVE_CURRENCY.symbol}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TokenList;