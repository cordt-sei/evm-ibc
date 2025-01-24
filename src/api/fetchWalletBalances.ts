// src/api/fetchWalletBalances.ts
import { API_BASE_URL } from 'config/api';
import { WalletBalance } from '../types';

export async function fetchWalletBalances(address: string): Promise<WalletBalance[]> {
  const response = await fetch(
    `${API_BASE_URL}/cosmos/bank/v1beta1/balances/${address}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch balances');
  }
  const data = await response.json();
  return data.balances;
}

export async function fetchDenomTrace(denom: string) {
  const denomHash = denom.split('/')[1];
  const response = await fetch(
    `${API_BASE_URL}/ibc/apps/transfer/v1/denom_traces/${denomHash}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch denom trace');
  }
  const data = await response.json();
  return {
    path: data.denom_trace.path,
    baseDenom: data.denom_trace.base_denom
  };
}