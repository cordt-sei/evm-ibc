// src/hooks/useChainInfo.ts
import { useState, useEffect, useCallback } from 'react';
import { ChainInfo, ChainResponse } from '../types';
import { CONFIG } from '../config/config';
import { api } from '../utils/api';

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
      // Use the centralized API client to fetch the client state
      const clientState: ChainResponse = await api.fetchClientState(channelId, portId);
      const chainData = clientState?.identified_client_state?.client_state;
      
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
          chainData: chainData,
          evmChainId: CONFIG.EVM_CHAIN_ID
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