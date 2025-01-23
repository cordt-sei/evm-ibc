// __tests__/utils/api.test.ts
import { fetchDenomTrace, fetchBalances, fetchClientState } from '../../utils/api';

describe('API Utils', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('fetches denom trace', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({
        denom_trace: {
          path: 'transfer/channel-0',
          base_denom: 'uatom'
        }
      })
    });

    const trace = await fetchDenomTrace('ibc/123');
    expect(trace.path).toBe('transfer/channel-0');
    expect(trace.base_denom).toBe('uatom');
  });

  it('fetches balances', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({
        balances: [
          { denom: 'ibc/123', amount: '1000000' }
        ]
      })
    });

    const balances = await fetchBalances('sei123');
    expect(balances).toHaveLength(1);
    expect(balances[0].denom).toBe('ibc/123');
  });

  it('handles API errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(fetchClientState('channel-0')).rejects.toThrow('Network error');
  });
});