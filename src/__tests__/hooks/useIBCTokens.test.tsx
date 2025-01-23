// __tests__/hooks/useIBCTokens.test.tsx
import { renderHook, act } from '@testing-library/react-hooks';
import { useIBCTokens } from '../../hooks/useIBCTokens';
import { fetchBalances, fetchDenomTrace } from '../../utils/api';

jest.mock('../../utils/api');

describe('useIBCTokens', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and filters IBC tokens', async () => {
    (fetchBalances as jest.Mock).mockResolvedValue([
      { denom: 'ibc/123', amount: '1000000' },
      { denom: 'usei', amount: '2000000' }
    ]);

    (fetchDenomTrace as jest.Mock).mockResolvedValue({
      path: 'transfer/channel-0',
      base_denom: 'uatom'
    });

    const { result, waitForNextUpdate } = renderHook(() => 
      useIBCTokens('0x123')
    );

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();

    expect(result.current.tokens).toHaveLength(1);
    expect(result.current.tokens[0].denom).toBe('ibc/123');
    expect(result.current.loading).toBe(false);
  });

  it('handles errors', async () => {
    (fetchBalances as jest.Mock).mockRejectedValue(new Error('API error'));

    const { result, waitForNextUpdate } = renderHook(() => 
      useIBCTokens('0x123')
    );

    await waitForNextUpdate();
    expect(result.current.error).toBe('Failed to fetch IBC tokens');
  });
});