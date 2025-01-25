// src/__tests__/utils/addressValidation.test.ts

import { validateAddress } from '../../utils/addressValidation';
import { ChainInfo } from '../../types';
import { Chain } from '@chain-registry/types';

describe('validateAddress', () => {
  const mockChainInfo: ChainInfo = {
    chainId: 'cosmoshub-4',
    chainName: 'Cosmos Hub',
    bech32Prefix: 'cosmos',
    slip44: 118,
    chainData: {} as Chain
  };

  test('validates correct bech32 address', () => {
    expect(validateAddress(
      'cosmos1...', 
      mockChainInfo
    )).toBe(true);
  });
});