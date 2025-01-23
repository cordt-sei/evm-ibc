// src/hooks/useIBCTokens.ts
import { useState, useEffect } from 'react';
import { IBCToken, WalletBalance } from '../types';
import { validateDenomTrace } from '../utils/denomValidation';
import { fetchWalletBalances } from '../api/fetchWalletBalances';

export function useIBCTokens(address: string) {
  const [tokens, setTokens] = useState<IBCToken[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      setLoading(true);
      try {
        const balances = await fetchWalletBalances(address);
        const ibcTokens = await Promise.all(
          balances
            .filter(balance => balance.denom.startsWith('ibc/'))
            .map(async balance => {
              try {
                const trace = await fetchDenomTrace(balance.denom);
                if (!validateDenomTrace(trace)) return null;

                const channel = trace.path.match(/channel-\d+/)?.[0] || '';
                return { denom: balance.denom, trace, balance: balance.amount, channel, isReturnable: true };
              } catch (err) {
                console.error(`Error processing ${balance.denom}:`, err);
                return null;
              }
            })
        );

        setTokens(ibcTokens.filter((token): token is IBCToken => token !== null));
      } catch (err) {
        setError('Failed to fetch IBC tokens');
      } finally {
        setLoading(false);
      }
    };

    if (address) fetchTokens();
  }, [address]);

  return { tokens, loading, error };
}