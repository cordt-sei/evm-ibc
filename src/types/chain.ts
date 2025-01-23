// src/types/chain.ts
import type { Chain as RegistryChain } from '@chain-registry/types';
import { Height } from './ibc';

export interface ChainInfo {
  chainId: string;
  chainName: string;
  bech32Prefix: string;
  slip44: number;
  chainData: RegistryChain;
  staking?: string;
}

export interface ChainResponse {
  chain_id: string;
  identified_client_state: {
    client_state: {
      chain_id: string;
      latest_height: Height;
    }
  }
}