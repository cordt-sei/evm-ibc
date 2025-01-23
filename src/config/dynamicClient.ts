// src/config/dynamicClient.ts
import { DynamicContextProps } from '@dynamic-labs/sdk-react-core';

export const dynamicClient: DynamicContextProps = {
  environmentId: process.env.REACT_APP_ENVIRONMENT_ID!,
  appName: 'IBC Return Transfer',
  appLogoUrl: 'https://sei.io/favicon.ico',
  evmNetworks: [{
    chainId: parseInt(process.env.REACT_APP_CHAIN_ID!, 16),
    name: 'Sei EVM',
    rpcUrl: process.env.REACT_APP_SEI_RPC_URL!
  }]
};