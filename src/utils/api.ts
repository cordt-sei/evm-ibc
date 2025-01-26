// src/utils/api.ts
import { chains } from 'chain-registry';
import { 
  DenomTrace, 
  ChainInfo, 
  WalletBalance, 
  ChainResponse,
  IBCToken
} from '../types';
import { validateDenomTrace } from './denomValidation';

const API_BASE = 'https://api.sei.basementnodes.ca';
const WALLET_API = 'https://wallet-api.sei.basementnodes.ca';

export async function resolveCosmosAddress(evmAddress: string): Promise<string> {
  const response = await fetch(`${WALLET_API}/${evmAddress}`);
  if (!response.ok) throw new Error('Failed to resolve Cosmos address');
  const data = await response.json();
  return data.result;
}

export async function fetchDenomTrace(denom: string): Promise<DenomTrace> {
  const hash = denom.split('/')[1];
  const response = await fetch(`${API_BASE}/ibc/apps/transfer/v1/denom_traces/${hash}`);
  if (!response.ok) throw new Error('Failed to fetch denom trace');
  const data = await response.json();
  return data.denom_trace;
}

export async function fetchBalances(address: string): Promise<WalletBalance[]> {
  const response = await fetch(`${API_BASE}/cosmos/bank/v1beta1/balances/${address}`);
  if (!response.ok) throw new Error('Failed to fetch balances');
  const data = await response.json();
  return data.balances || [];
}

export async function fetchClientState(channelId: string): Promise<ChainResponse> {
  const response = await fetch(
    `${API_BASE}/ibc/core/channel/v1/channels/${channelId}/ports/transfer/client_state`
  );
  if (!response.ok) throw new Error('Failed to fetch client state');
  return response.json();
}

export async function fetchChainInfo(channelId: string): Promise<ChainInfo | null> {
  try {
    const clientState = await fetchClientState(channelId);
    const chainId = clientState?.identified_client_state?.client_state?.chain_id;
    
    if (!chainId) {
      throw new Error('Chain ID not found in client state');
    }

    const chainInfo = chains.find(c => c.chain_id === chainId);
    if (!chainInfo) {
      console.warn(`Chain not found in registry: ${chainId}`);
      return null;
    }

    return {
      chainId: chainInfo.chain_id,
      chainName: chainInfo.pretty_name || chainInfo.chain_name,
      bech32Prefix: chainInfo.bech32_prefix,
      slip44: chainInfo.slip44 || 118,
      chainData: chainInfo,
      staking: chainInfo.staking?.staking_tokens?.[0]?.denom
    };
  } catch (error) {
    console.error('Error fetching chain info:', error);
    return null;
  }
}

export async function processIBCTokens(balances: WalletBalance[]): Promise<IBCToken[]> {
  const ibcTokens = await Promise.all(
    balances
      .filter(balance => balance.denom.startsWith('ibc/'))
      .map(async balance => {
        try {
          const trace = await fetchDenomTrace(balance.denom);
          if (!validateDenomTrace(trace)) return null;

          const channel = trace.path.match(/channel-\d+/)?.[0] || '';
          const chainInfo = await fetchChainInfo(channel);
          
          if (!chainInfo) return null;

          return {
            denom: balance.denom,
            trace,
            balance: balance.amount,
            channel,
            chainId: chainInfo.chainId,
            chainInfo,
            isReturnable: true
          };
        } catch (err) {
          console.error(`Error processing ${balance.denom}:`, err);
          return null;
        }
      })
  );

  return ibcTokens.filter((token): token is IBCToken => token !== null);
}