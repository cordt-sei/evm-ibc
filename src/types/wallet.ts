// src/types/wallet.ts

// Keplr currency configuration type used in chain suggestions
export interface KeplrCurrency {
  coinDenom: string;          // Display denomination (e.g., "ATOM")
  coinMinimalDenom: string;   // Base denomination (e.g., "uatom")
  coinDecimals: number;       // Number of decimals (typically 6 for Cosmos)
  coinGeckoId?: string;       // Optional CoinGecko ID for price data
}

// Extended currency type that includes gas price configuration
export interface KeplrFeeCurrency extends KeplrCurrency {
  gasPriceStep?: {
    low: number;
    average: number;
    high: number;
  };
}

// Complete chain configuration expected by Keplr
export interface KeplrChainInfo {
  chainId: string;
  chainName: string;
  rpc: string;
  rest: string;
  bip44: {
    coinType: number;
  };
  bech32Config: {
    bech32PrefixAccAddr: string;      // e.g., "cosmos"
    bech32PrefixAccPub: string;       // e.g., "cosmospub"
    bech32PrefixValAddr: string;      // e.g., "cosmosvaloper"
    bech32PrefixValPub: string;       // e.g., "cosmosvaloperpub"
    bech32PrefixConsAddr: string;     // e.g., "cosmosvalcons"
    bech32PrefixConsPub: string;      // e.g., "cosmosvalconspub"
  };
  currencies: KeplrCurrency[];
  feeCurrencies: KeplrFeeCurrency[];
  stakeCurrency: KeplrCurrency;
}

// Enhanced KeplrWindow interface with proper type for experimentalSuggestChain
export interface KeplrWindow extends Window {
  keplr?: {
    enable: (chainId: string) => Promise<void>;
    getOfflineSigner: (chainId: string) => {
      getAccounts: () => Promise<Array<{ address: string; pubkey: Uint8Array }>>;
    };
    experimentalSuggestChain: (chainInfo: KeplrChainInfo) => Promise<void>;
  }
}

// Existing wallet configuration type
export interface WalletConfig {
  address: string;
  chainId: string;
  balance?: string;
  connected: boolean;
}

// Existing balance type for wallet
export interface WalletBalance {
  denom: string;
  amount: string;
}