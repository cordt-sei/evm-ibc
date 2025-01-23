// src/types/ibc.ts
export interface Height {
  revision_number: string;
  revision_height: string;
}

export interface DenomTrace {
  path: string;
  base_denom: string;
}

export interface IBCToken {
  denom: string;
  trace: DenomTrace;
  balance: string;
  channel: string;
  isReturnable: boolean;
}

export interface ChannelDetails {
  counterpartyChannelId: string;
  connectionId: string;
  channelId: string;
  portId: string;
}

export interface ClientState {
  chain_id: string;
  latest_height: Height;
}