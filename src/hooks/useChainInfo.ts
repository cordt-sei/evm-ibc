// src/hooks/useChainInfo.ts
import { useState, useEffect, useCallback } from 'react';
import { ChainInfo } from '../types';
import { api } from '../utils/api';
import { CONFIG } from '../config/config';

interface ChainInfoState {
  chainInfo: Map<string, ChainInfo>;
  loading: boolean;
  error: string | null;
}

export function useChainInfo() {
  const [state, setState] = useState<ChainInfoState>({
    chainInfo: new Map(),
    loading: false,
    error: null
  });

  const fetchChainInfo = useCallback(async (channelId: string, portId: string) => {
    if (state.chainInfo.has(channelId)) return;

    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await fetch(
        `${CONFIG.API.BASE_URL}${CONFIG.API.ENDPOINTS.IBC_CLIENT}/channels/${channelId}/ports/${portId}/client_state`,
        { timeout: CONFIG.API.TIMEOUT }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch chain info: ${response.statusText}`);
      }
      
      const data = await response.json();
      const chainData = data.identified_client_state?.client_state;
      
      if (!chainData) {
        throw new Error('No chain data found in response');
      }
      
      setState(prev => ({
        ...prev,
        chainInfo: new Map(prev.chainInfo).set(channelId, {
          chainId: chainData.chain_id,
          chainName: chainData.chain_name || chainData.chain_id,
          bech32Prefix: chainData.bech32_config?.main_prefix || '',
          slip44: chainData.slip44 || CONFIG.NETWORK.NATIVE_CURRENCY.decimals,
          chainData: chainData
        }),
        loading: false
      }));
      
    } catch (err) {
      console.error('Chain info fetch error:', err);
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Failed to fetch chain info',
        loading: false
      }));
    }
  }, [state.chainInfo]);

  return {
    ...state,
    fetchChainInfo
  };
}