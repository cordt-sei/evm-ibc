// src/utils/tokenDisplay.ts
import type { IBCToken } from '../types';
import type { Chain, Asset } from '@chain-registry/types';
import type { ChainWithAssets } from '../types/chain';
import { chains } from 'chain-registry';

interface TokenDisplay {
  symbol: string;
  originChain: string;
  channel: string;
}

export function getTokenDisplayInfo(token: IBCToken): TokenDisplay {
  const baseDenom = token.trace.base_denom;
  const channel = token.channel;

  const chainData = chains.find((chain): chain is ChainWithAssets => {
    if (!('assets' in chain)) return false;
    const chainAssets = chain.assets as Asset[];
    return chainAssets.some(asset => 
      asset.base === baseDenom || 
      asset.display === baseDenom
    );
  });

  const defaultName = baseDenom.replace('u', '').toUpperCase();
  const symbol = chainData?.assets[0]?.symbol || defaultName;
  const originChain = chainData?.pretty_name || defaultName;

  return { symbol, originChain, channel };
}