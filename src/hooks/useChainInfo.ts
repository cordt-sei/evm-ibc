// src/hooks/useChainInfo.ts
import { useState, useEffect } from 'react';
import { API_CONFIG } from '../config';
import type { ChainInfo } from '../types';

export function useChainInfo() {
  const [chainInfo, setChainInfo] = useState<Map<string, ChainInfo>>(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChainInfo = async (channelId: string, portId: string) => {
    if (chainInfo.has(channelId)) return;

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/client_state`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch chain info');
      }
      
      const data = await response.json();
      const chainData = data.identified_client_state?.client_state;
      
      if (!chainData) {
        throw new Error('No chain data found');
      }
      
      // Update the chainInfo map with the new data
      setChainInfo(prev => new Map(prev).set(channelId, {
        chainId: chainData.chain_id,
        chainName: chainData.chain_name || chainData.chain_id,
        bech32Prefix: chainData.bech32_config?.main_prefix || '',
        slip44: chainData.slip44 || 118,
        chainData: chainData
      }));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch chain info');
      console.error('Chain info fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return { chainInfo, loading, error, fetchChainInfo };
}