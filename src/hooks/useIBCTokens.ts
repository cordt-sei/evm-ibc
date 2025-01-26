// src/hooks/useIBCTokens.ts
import { useState, useEffect, useCallback } from 'react';
import { IBCToken } from '../types';
import { api } from '../utils/api';
import { CONFIG } from '../config/config';

interface IBCTokensState {
  tokens: IBCToken[];
  loading: boolean;
  error: string | null;
}

export function useIBCTokens(evmAddress: string) {
  const [state, setState] = useState<IBCTokensState>({
    tokens: [],
    loading: false,
    error: null
  });

  const fetchTokens = useCallback(async () => {
    if (!evmAddress) return;
    
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // First resolve the Cosmos address from EVM address
      const cosmosAddress = await api.resolveCosmosAddress(evmAddress);
      
      // Then fetch balances for the Cosmos address
      const balances = await api.fetchBalances(cosmosAddress);
      
      // Process and filter for valid IBC tokens
      const ibcTokens = await api.processIBCTokens(balances);
      
      setState({
        tokens: ibcTokens,
        loading: false,
        error: null
      });
    } catch (err) {
      console.error('Failed to fetch IBC tokens:', err);
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch IBC tokens'
      }));
    }
  }, [evmAddress]);

  useEffect(() => {
    if (evmAddress) {
      fetchTokens();
    } else {
      setState({
        tokens: [],
        loading: false,
        error: null
      });
    }
  }, [evmAddress, fetchTokens]);

  const refetch = useCallback(() => {
    fetchTokens();
  }, [fetchTokens]);

  return {
    ...state,
    refetch
  };
}