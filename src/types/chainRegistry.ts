// src/types/chain-registry.ts
import type { Chain as Asset } from '@chain-registry/types';

export interface AssetList {
  chain_name: string;
  assets: Asset[];
}