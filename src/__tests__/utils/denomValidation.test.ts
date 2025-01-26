// src/__tests__/utils/denomValidation.test.ts
import { validateDenomTrace } from '../../utils/denomValidation';

describe('validateDenomTrace', () => {
  test('validates single hop transfer', () => {
    expect(validateDenomTrace({ 
      path: 'transfer/channel-0',
      base_denom: 'uatom' 
    })).toBe(true);
  });

  test('rejects multi-hop transfer', () => {
    expect(validateDenomTrace({
      path: 'transfer/channel-0/transfer/channel-1',
      base_denom: 'uatom'
    })).toBe(false);
  });
});