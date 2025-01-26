// src/utils/tokenDisplay.ts
import type { Asset } from '@chain-registry/types';
import type { IBCToken, TokenDisplay } from '../types';
import type { ExtendedChain } from '../types/chain';

export function formatTokenAmount(amount: string, decimals: number = 6): string {
  const value = parseInt(amount) / Math.pow(10, decimals);
  return value.toLocaleString(undefined, {
    maximumFractionDigits: decimals
  });
}

function findAssetDecimals(asset: Asset | undefined): number {
  if (!asset?.denom_units?.length) return 6;
  
  const exponent = asset.denom_units.reduce((max, unit) => 
    Math.max(max, unit.exponent || 0), 0);
  
  return exponent;
}

export function getTokenDisplayInfo(token: IBCToken): TokenDisplay {
  const baseDenom = token.trace.base_denom;
  const chainData = token.chainInfo as ExtendedChain;

  const asset = chainData.assets?.find(asset => 
    asset.base === baseDenom || 
    asset.display === baseDenom
  );

  const defaultName = baseDenom.replace(/^u/, '').toUpperCase();
  const decimals = findAssetDecimals(asset);
  
  return {
    symbol: asset?.symbol ?? defaultName,
    originChain: chainData.pretty_name ?? chainData.chain_name,
    channel: token.channel,
    displayAmount: formatTokenAmount(token.balance, decimals),
    decimals
  };
}

export function getTokenExplorerUrl(token: IBCToken): string | null {
  const chainData = token.chainInfo as ExtendedChain;
  const explorer = chainData.explorers?.[0];
  
  if (!explorer?.url) return null;
  
  return `${explorer.url}/tokens/${token.denom}`;
}