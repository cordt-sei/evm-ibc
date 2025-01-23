// src/utils/addressValidation.ts
import { bech32 } from 'bech32';
import { ChainInfo } from '../types';

export function validateAddress(address: string, chainInfo: ChainInfo): boolean {
  try {
    const decoded = bech32.decode(address);
    return decoded.prefix === chainInfo.bech32Prefix;
  } catch {
    return false;
  }
}