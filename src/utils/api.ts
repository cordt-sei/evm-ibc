// src/utils/api.ts
import { DenomTrace, ChainInfo, WalletBalance } from '../types';

const API_BASE = process.env.REACT_APP_API_URL;

export async function fetchDenomTrace(denom: string): Promise<DenomTrace> {
  const hash = denom.split('/')[1];
  const response = await fetch(`${API_BASE}/ibc/apps/transfer/v1/denom_traces/${hash}`);
  const data = await response.json();
  return data.denom_trace;
}

export async function fetchBalances(address: string): Promise<WalletBalance[]> {
  const response = await fetch(`${API_BASE}/cosmos/bank/v1beta1/balances/${address}`);
  const data = await response.json();
  return data.balances;
}

export async function fetchClientState(channelId: string): Promise<ChainInfo> {
  const response = await fetch(
    `${API_BASE}/ibc/core/channel/v1/channels/${channelId}/ports/transfer/client_state`
  );
  return response.json();
}