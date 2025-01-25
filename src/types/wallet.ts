// src/types/wallet.ts
import type { Window as KeplrWindow } from '@keplr-wallet/types';
export { KeplrWindow };

export interface KeplrCurrency {
  coinDenom: string;
  coinMinimalDenom: string;
  coinDecimals: number;
  coinGeckoId?: string;
}

export interface KeplrFeeCurrency extends KeplrCurrency {
  gasPriceStep?: {
    low: number;
    average: number;
    high: number;
  };
}

export interface KeplrChainInfo {
  chainId: string;
  chainName: string;
  rpc: string;
  rest: string;
  bip44: {
    coinType: number;
  };
  bech32Config: {
    bech32PrefixAccAddr: string;
    bech32PrefixAccPub: string;
    bech32PrefixValAddr: string;
    bech32PrefixValPub: string;
    bech32PrefixConsAddr: string;
    bech32PrefixConsPub: string;
  };
  currencies: KeplrCurrency[];
  feeCurrencies: KeplrFeeCurrency[];
  stakeCurrency: KeplrCurrency;
}

export interface WalletConfig {
  address: string;
  chainId: string;
  balance?: string;
  connected: boolean;
}

export interface WalletBalance {
  denom: string;
  amount: string;
}