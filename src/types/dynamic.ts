// src/types/dynamic.ts
import type { DynamicContextProps } from '@dynamic-labs/sdk-react-core';

export interface EVMNetwork {
  chainId: number;
  name: string;
  rpcUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExplorerUrls: string[];
}

export interface DynamicConfig extends Omit<DynamicContextProps, 'settings'> {
  environmentId: string;
  appName: string;
  walletConnectors: string[];
  evmNetworks: EVMNetwork[];
  initializeOnMount: boolean;
  displaySiweStatement: boolean;
  storageKey?: string;
  walletConnectorOptions?: {
    injected?: {
      displayName?: string;
      showAppLogoOnConnectingScreen?: boolean;
      showAccountIconOnConnectingScreen?: boolean;
      showBackButton?: boolean;
    };
  };
}