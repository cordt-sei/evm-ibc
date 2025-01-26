// src/utils/chain.ts
import { bech32 } from 'bech32';
import { chains } from 'chain-registry';
import type { ChainInfo, DenomTrace, ChainResponse } from '../types';
import type { ExtendedChain } from '../types/chainRegistry';

export function validateDenomTrace(trace: DenomTrace): boolean {
  const channels = trace.path.match(/channel-\d+/g) || [];
  if (channels.length !== 1) return false;

  const pathSegments = trace.path.split('/');
  return pathSegments.length === 2 && pathSegments[0] === 'transfer';
}

export function validateAddress(address: string, chainInfo: ChainInfo): boolean {
  try {
    const decoded = bech32.decode(address);
    return decoded.prefix === chainInfo.bech32Prefix;
  } catch {
    return false;
  }
}

export function processChainResponse(response: ChainResponse): ChainInfo | null {
  try {
    const chainId = response.identified_client_state?.client_state?.chain_id;
    if (!chainId) return null;

    const chainData = chains.find(c => c.chain_id === chainId) as ExtendedChain | undefined;
    if (!chainData) return null;

    return {
      chainId: chainData.chain_id,
      chainName: chainData.pretty_name ?? chainData.chain_name,
      bech32Prefix: chainData.bech32_prefix,
      slip44: chainData.slip44 ?? 118,
      chainData: chainData,
      staking: chainData.staking?.staking_tokens[0]?.denom
    };
  } catch {
    return null;
  }
}

export function getChainExplorerUrl(chainInfo: ChainInfo, type: 'tx' | 'address', value: string): string | null {
  const chainData = chainInfo.chainData as ExtendedChain;
  const explorer = chainData.explorers?.[0];
  if (!explorer?.url) return null;

  const baseUrl = explorer.url.replace(/\/$/, '');
  const path = type === 'tx' ? 'txs' : 'accounts';
  
  return `${baseUrl}/${path}/${value}`;
}