// src/types/chain-registry.ts
import type { Chain as BaseChain, Asset } from '@chain-registry/types';

export interface ExtendedChain extends BaseChain {
  chain_name: string;
  pretty_name?: string;
  status: string;
  network_type: string;
  bech32_prefix: string;
  slip44?: number;
  assets?: Asset[];
  staking?: {
    staking_tokens: {
      denom: string;
    }[];
  };
  explorers?: {
    url: string;
    tx_page?: string;
  }[];
}

export interface AssetList {
  chain_name: string;
  assets: Asset[];
}