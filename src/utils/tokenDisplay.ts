// src/utils/tokenDisplay.ts
import { IBCToken } from '../types';
import { chains } from 'chain-registry';

interface TokenDisplay {
  symbol: string;
  originChain: string;
  channel: string;
}

export function getTokenDisplayInfo(token: IBCToken): TokenDisplay {
  const baseDenom = token.trace.base_denom;
  const channel = token.channel;
  
  const chainData = chains.find(c => 
    c.currencies.some(curr => curr.base === baseDenom)
  );

  return {
    symbol: chainData?.currencies.find(c => c.base === baseDenom)?.display || baseDenom,
    originChain: chainData?.chain_name || 'Unknown Chain',
    channel
  };
}