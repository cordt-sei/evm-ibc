// src/types/ibc.ts
import type { ExtendedChain, Height } from './chain';

export interface DenomTrace {
  path: string;
  base_denom: string;
}

export interface ClientState {
  chain_id: string;
  latest_height: Height;
}

export interface IBCToken {
  denom: string;
  trace: DenomTrace;
  balance: string;
  channel: string;
  chainId: string;
  chainInfo: ExtendedChain;
  isReturnable: boolean;
  explorerUrl?: string;
}

export interface TokenDisplay {
  symbol: string;
  originChain: string;
  channel: string;
  displayAmount: string;
  decimals: number;
  explorerUrl?: string;
}