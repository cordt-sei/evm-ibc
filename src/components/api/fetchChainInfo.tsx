// src/components/api/fetchChainInfo.tsx

import { API_BASE_URL } from "./config";
// Option 1: Static registry from chain-registry (mainnet, testnet, or combined).
import { chains } from "chain-registry"; 

// Option 2 (advanced): dynamic fetching of chain data
// import { ChainRegistryClient } from "@chain-registry/client";

export interface ChainInfo {
  chainId: string;
  // Extend with any additional fields from your chain-registry data
  chainName?: string;
  chainData?: any; // e.g. the entire chain object from chain-registry
}

/**
 * 1) Fetch the chainId from the client_state for a given channel/port.
 */
async function fetchChainIdFromClientState(channelId: string, portId: string): Promise<string> {
  const url = `${API_BASE_URL}/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/client_state`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch chain info at ${url}. Status: ${response.status}`);
  }

  const data = await response.json();
  const chainId = data?.identified_client_state?.client_state?.chain_id;
  if (!chainId) {
    throw new Error("chain_id not found in client_state response.");
  }

  return chainId;
}

/**
 * 2) From the static chain-registry, find the chain that matches a given chain_id.
 *    If you prefer dynamic fetching, see the ChainRegistryClient example below.
 */
function findChainRegistryData(chainId: string) {
  // 'chains' is an array of chain objects with fields like { chain_id, chain_name, ... }
  // This finds the first matching chain.
  return chains.find((c) => c.chain_id === chainId);
}

/**
 * fetchChainInfo: High-level function to get:
 *  - chainId from the channel's client_state
 *  - chain registry data for that chainId
 */
export async function fetchChainInfo(channelId: string, portId: string): Promise<ChainInfo> {
  const chainId = await fetchChainIdFromClientState(channelId, portId);
  const registryData = findChainRegistryData(chainId);
  if (!registryData) {
    // Not all chains in the cosmos ecosystem might be in the default chain-registry
    // If not found, you can either throw or return minimal info
    throw new Error(`No chain-registry data found for chain_id: ${chainId}`);
  }

  return {
    chainId,
    chainName: registryData.chain_name,
    chainData: registryData,
  };
}

/* 
   OPTIONAL: If you wanted dynamic fetching from chain-registry, you would do something like:

   import { ChainRegistryClient } from '@chain-registry/client';

   async function fetchChainInfoDynamically(chainId: string): Promise<ChainInfo> {
     const client = new ChainRegistryClient({ chainNames: [/* you need the chain_name not chain_id * /]});
     await client.fetchUrls();
     // Then find chain where chain.chain_id === chainId
     // ...
   }
*/
