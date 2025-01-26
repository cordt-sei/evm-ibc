// src/utils/validation.ts
import { bech32 } from 'bech32';
import { ChainInfo, DenomTrace } from '../types';

export const validation = {
  address: (address: string, chainInfo: ChainInfo): boolean => {
    try {
      const decoded = bech32.decode(address);
      return decoded.prefix === chainInfo.bech32Prefix;
    } catch {
      return false;
    }
  },

  denomTrace: (trace: DenomTrace): boolean => {
    // Validate single-hop transfer
    const channels = trace.path.match(/channel-\d+/g) || [];
    if (channels.length !== 1) return false;

    // Validate path format
    const pathSegments = trace.path.split('/');
    return pathSegments.length === 2 && pathSegments[0] === 'transfer';
  },

  amount: (amount: string, maxDecimals: number = 6): boolean => {
    if (!amount) return false;
    const parts = amount.split('.');
    if (parts.length > 2) return false;
    if (parts[1] && parts[1].length > maxDecimals) return false;
    return /^\d*\.?\d*$/.test(amount);
  },

  chainId: (chainId: string): boolean => {
    return /^[a-zA-Z0-9-]+$/.test(chainId);
  }
};

// Type guard for chain info
export function isValidChainInfo(chainInfo: any): chainInfo is ChainInfo {
  return (
    typeof chainInfo === 'object' &&
    chainInfo !== null &&
    typeof chainInfo.chainId === 'string' &&
    typeof chainInfo.bech32Prefix === 'string'
  );
}