// src/utils/api.ts
import { chains } from 'chain-registry';
import { CONFIG } from '../config/config';
import type { 
  DenomTrace, 
  ChainInfo, 
  WalletBalance, 
  ChainResponse,
  IBCToken,
  ExtendedChain
} from '../types';
import { validation } from './validation';

class APIError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'APIError';
  }
}

// Helper function to implement timeout for fetch
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = CONFIG.API.TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export const api = {
  async resolveCosmosAddress(evmAddress: string): Promise<string> {
    const response = await fetchWithTimeout(`${CONFIG.API.WALLET_API}/${evmAddress}`);
    if (!response.ok) throw new APIError('Failed to resolve Cosmos address');
    const data = await response.json();
    return data.result;
  },

  async fetchDenomTrace(denom: string): Promise<DenomTrace> {
    const hash = denom.split('/')[1];
    const response = await fetchWithTimeout(
      `${CONFIG.API.BASE_URL}${CONFIG.API.ENDPOINTS.IBC_TRANSFER}/denom_traces/${hash}`
    );
    if (!response.ok) throw new APIError('Failed to fetch denom trace');
    const data = await response.json();
    return data.denom_trace;
  },

  async fetchBalances(address: string): Promise<WalletBalance[]> {
    const response = await fetchWithTimeout(
      `${CONFIG.API.BASE_URL}${CONFIG.API.ENDPOINTS.BANK}/balances/${address}`
    );
    if (!response.ok) throw new APIError('Failed to fetch balances');
    const data = await response.json();
    return data.balances || [];
  },

  async fetchClientState(channelId: string, portId: string = 'transfer'): Promise<ChainResponse> {
    const response = await fetchWithTimeout(
      `${CONFIG.API.BASE_URL}/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/client_state`
    );
    if (!response.ok) throw new APIError('Failed to fetch client state');
    return response.json();
  },

  async fetchChainInfo(channelId: string): Promise<ChainInfo | null> {
    try {
      const clientState = await this.fetchClientState(channelId);
      const chainId = clientState?.identified_client_state?.client_state?.chain_id;
      
      if (!chainId) {
        throw new APIError('Chain ID not found in client state');
      }

      const registryChain = chains.find(c => c.chain_id === chainId);
      if (!registryChain || !registryChain.bech32_prefix) {
        console.warn(`Chain not found in registry or missing bech32_prefix: ${chainId}`);
        return null;
      }

      // Ensure required chain_type property exists
      const chainData = {
        ...registryChain,
        chain_type: 'cosmos' as const
      };

      return {
        chainId: chainData.chain_id,
        chainName: chainData.pretty_name || chainData.chain_name,
        bech32Prefix: chainData.bech32_prefix,
        slip44: chainData.slip44 || 118,
        chainData,
        staking: chainData.staking?.staking_tokens?.[0]?.denom,
        evmChainId: CONFIG.EVM_CHAIN_ID
      };
    } catch (error) {
      console.error('Error fetching chain info:', error);
      return null;
    }
  },

  async processIBCTokens(balances: WalletBalance[]): Promise<IBCToken[]> {
    const ibcTokenPromises = balances
      .filter(balance => balance.denom.startsWith('ibc/'))
      .map(async balance => {
        try {
          const trace = await this.fetchDenomTrace(balance.denom);
          if (!validation.denomTrace(trace)) return null;

          const channel = trace.path.match(/channel-\d+/)?.[0];
          if (!channel) return null;

          const chainInfo = await this.fetchChainInfo(channel);
          if (!chainInfo) return null;

          return {
            denom: balance.denom,
            trace,
            balance: balance.amount,
            channel,
            chainId: chainInfo.chainId,
            chainInfo: chainInfo as unknown as ExtendedChain,
            isReturnable: true
          };
        } catch (err) {
          console.error(`Error processing ${balance.denom}:`, err);
          return null;
        }
      });

    const results = await Promise.all(ibcTokenPromises);
    return results.filter((token): token is IBCToken => token !== null);
  },

  // failed requests retry
  async retryRequest<T>(
    request: () => Promise<T>,
    retries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    try {
      return await request();
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.retryRequest(request, retries - 1, delay * 2);
      }
      throw error;
    }
  }
};

// API response handling
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};