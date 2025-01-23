// src/types/wallet.ts
export interface KeplrWindow extends Window {
  keplr?: {
    enable: (chainId: string) => Promise<void>;
    getOfflineSigner: (chainId: string) => any;
    experimentalSuggestChain: (chainInfo: any) => Promise<void>;
  }
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