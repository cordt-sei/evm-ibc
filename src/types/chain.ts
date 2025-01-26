// src/types/chain.ts
import type { Chain as RegistryChain, Asset } from '@chain-registry/types';

export interface Height {
  revision_number: string;
  revision_height: string;
}

export interface ChainInfo {
  chainId: string;
  chainName: string;
  bech32Prefix: string;
  slip44: number;
  chainData: RegistryChain;
  staking?: string;
  evmChainId: number; // Added to match new config
}

export interface ChainResponse {
  identified_client_state: {
    client_state: {
      chain_id: string;
      latest_height: Height;
      chain_name?: string;
      bech32_config?: {
        main_prefix: string;
      };
      slip44?: number;
    }
  }
}

export interface ExtendedChain extends Omit<RegistryChain, 'status' | 'network_type'> {
  chain_name: string;
  pretty_name?: string;
  status: 'live' | 'upcoming' | 'killed';
  network_type: 'mainnet' | 'testnet' | 'devnet';
  bech32_prefix: string;
  slip44?: number;
  evmChainId?: number;
  assets?: Asset[];
  staking?: {
    staking_tokens: Array<{
      denom: string;
    }>;
  };
  explorers?: Array<{
    url: string;
    tx_page?: string;
  }>;
  nativeCurrency?: {
    name: string;
    symbol: string;
    decimals: number;
  };
}