// src/hooks/useIBCTokens.ts
import { useState, useEffect } from 'react';
import { IBCToken } from '../types';
import { resolveCosmosAddress, fetchBalances, processIBCTokens } from '../utils/api';

export function useIBCTokens(evmAddress: string) {
  const [tokens, setTokens] = useState<IBCToken[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      if (!evmAddress) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const cosmosAddress = await resolveCosmosAddress(evmAddress);
        const balances = await fetchBalances(cosmosAddress);
        const ibcTokens = await processIBCTokens(balances);
        setTokens(ibcTokens);
      } catch (err) {
        console.error('Failed to fetch IBC tokens:', err);
        setError('Failed to fetch IBC tokens');
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, [evmAddress]);

  return { tokens, loading, error };
}