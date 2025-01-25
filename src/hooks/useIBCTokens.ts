// src/hooks/useIBCTokens.ts
import { useState, useEffect } from 'react';
import { IBCToken } from '../types';
import { validateDenomTrace } from '../utils/denomValidation';
import { fetchDenomTrace, fetchBalances, resolveCosmosAddress } from '../utils/api';

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
        console.log('Resolved address:', cosmosAddress);
        
        const balances = await fetchBalances(cosmosAddress);
        console.log('Fetched balances:', balances);
        
        const ibcTokens = await Promise.all(
          balances
            .filter(balance => balance.denom.startsWith('ibc/'))
            .map(async balance => {
              try {
                const trace = await fetchDenomTrace(balance.denom);
                if (!validateDenomTrace(trace)) return null;

                const channel = trace.path.match(/channel-\d+/)?.[0] || '';
                return {
                  denom: balance.denom,
                  trace,
                  balance: balance.amount,
                  channel,
                  isReturnable: true
                };
              } catch (err) {
                console.error(`Error processing ${balance.denom}:`, err);
                return null;
              }
            })
        );

        const validTokens = ibcTokens.filter((token): token is IBCToken => token !== null);
        console.log('Valid IBC tokens:', validTokens);
        setTokens(validTokens);
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