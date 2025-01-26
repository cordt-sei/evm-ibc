// src/types/ibc.ts
import type { Chain } from '@chain-registry/types';
import type { ExtendedChain } from './chain';

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
  chainId: string;
  chainInfo: ExtendedChain;
  isReturnable: boolean;
}

export interface TokenDisplay {
  symbol: string;
  originChain: string;
  channel: string;
  displayAmount: string;
  decimals: number;
}