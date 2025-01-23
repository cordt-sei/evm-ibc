// src/hooks/useChainInfo.ts
import { useState } from 'react';
import { chains } from 'chain-registry';
import { ChainInfo, ClientState } from '../types';

export function useChainInfo() {
 const [chainInfo, setChainInfo] = useState<Map<string, ChainInfo>>(new Map());

 const fetchChainInfo = async (channelId: string, portId: string): Promise<ChainInfo> => {
   const response = await fetch(`${API_BASE_URL}/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/client_state`);
   const clientState = await response.json() as ClientState;
   
   const chainData = chains.find(c => c.chain_id === clientState.chain_id);
   if (!chainData) throw new Error(`Chain ${clientState.chain_id} not found`);

   const info: ChainInfo = {
     chainId: clientState.chain_id,
     chainName: chainData.chain_name,
     bech32Prefix: chainData.bech32_prefix,
     slip44: chainData.slip44 ?? 118,
     chainData,
     staking: chainData.staking?.staking_tokens[0]?.denom
   };

   setChainInfo(prev => new Map(prev).set(channelId, info));
   return info;
 };

 return { chainInfo, fetchChainInfo };
}