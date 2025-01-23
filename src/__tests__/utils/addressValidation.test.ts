// src/__tests__/utils/addressValidation.test.ts
import { validateAddress } from '../../utils/addressValidation';

describe('validateAddress', () => {
  const mockChainInfo = {
    bech32Prefix: 'cosmos',
    chainId: 'cosmoshub-4'
  };

  test('validates correct bech32 address', () => {
    expect(validateAddress(
      'cosmos1...', 
      mockChainInfo
    )).toBe(true);
  });
});