// src/components/api/fetchChainInfo.tsx

import { API_BASE_URL } from './config';
import { chains } from 'chain-registry';
import type { Chain } from '@chain-registry/types';

export interface ChainInfo {
  chainId: string;
  chainName?: string;
  staking?: string;
  slip44: number;
  chainData: Chain;
}

/**
 * Fetch the chain ID from the IBC client_state for a given channel/port.
 */
async function fetchChainIdFromClientState(
  channelId: string,
  portId: string
): Promise<string> {
  const url = `${API_BASE_URL}/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/client_state`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch chain info at ${url}. Status: ${response.status}`
    );
  }

  const data = await response.json();
  const chainId = data?.identified_client_state?.client_state?.chain_id;
  if (!chainId) {
    throw new Error('chain_id not found in client_state response.');
  }

  return chainId;
}

/**
 * From the static chain-registry, find the chain that matches a given chain_id.
 */
function findChainRegistryData(chainId: string): Chain | undefined {
  // 'chains' is an array of chain objects with fields like { chain_id, chain_name, ... }
  return chains.find((c) => c.chain_id === chainId);
}

/**
 * High-level function to get:
 * 1) chainId from the channel's client_state
 * 2) chain registry data for that chainId
 */
export async function fetchChainInfo(
  channelId: string,
  portId: string
): Promise<ChainInfo> {
  const chainId = await fetchChainIdFromClientState(channelId, portId);
  const registryData = findChainRegistryData(chainId);

  if (!registryData) {
    throw new Error(`No chain-registry data found for chain_id: ${chainId}`);
  }

  return {
    chainId,
    chainName: registryData.chain_name,
    staking: registryData.staking?.staking_tokens[0]?.denom,
    slip44: registryData.slip44 ?? 0,
    chainData: registryData,
  };
}
