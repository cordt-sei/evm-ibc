// src/hooks/useChainInfo.ts
import { useState, useCallback } from 'react';
import { ChainInfo } from '../types';
import { api } from '../utils/api';

interface ChainInfoState {
  chainInfoMap: Map<string, ChainInfo>;
  loading: boolean;
  error: string | null;
}

export function useChainInfo() {
  const [state, setState] = useState<ChainInfoState>({
    chainInfoMap: new Map(),
    loading: false,
    error: null
  });

  const fetchChainInfo = useCallback(async (channelId: string, portId: string = 'transfer') => {
    if (state.chainInfoMap.has(channelId)) return;

    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const chainInfo = await api.fetchChainInfo(channelId);
      
      if (!chainInfo) {
        throw new Error('Failed to fetch chain info');
      }

      setState(prev => ({
        ...prev,
        chainInfoMap: new Map(prev.chainInfoMap).set(channelId, chainInfo),
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
  }, [state.chainInfoMap]);

  return {
    ...state,
    fetchChainInfo
  };
}