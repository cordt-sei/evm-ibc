// src/types.ts

/**
 * Represents a single wallet balance entry for an IBC asset.
 */
export interface WalletBalance {
  denom: string;
  amount: string;
}
