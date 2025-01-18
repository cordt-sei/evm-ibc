// src/components/api/decodeIbcDenom

import { API_BASE_URL } from './config';

interface decodeDenom {
  counterpartyChannelId: string;
  connectionId: string;
}

export async function decodeDenom(
  denom: string
): Promise<{ channel: string; baseDenom: string }> {
  const denomHash = denom.split('/')[1];
  const response = await fetch(
    `${API_BASE_URL}/ibc/apps/transfer/v1/denom_traces/${denomHash}`
  );
  const data: { denom_trace: { path: string; base_denom: string } } =
    await response.json();
  const path = data.denom_trace.path;
  const baseDenom = data.denom_trace.base_denom;
  return { channel: path.split('/')[1], baseDenom };
}
