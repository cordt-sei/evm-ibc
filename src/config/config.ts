// src/config/config.ts
import { Environment, environments } from './environments';

// Validate required environment variables
const requiredEnvVars = {
  ENVIRONMENT_ID: process.env.REACT_APP_ENVIRONMENT_ID,
  SEI_API_URL: process.env.REACT_APP_SEI_API_URL,
  SEI_EVM_RPC_URL: process.env.REACT_APP_EVM_RPC_URL,
  CHAIN_ID: process.env.REACT_APP_CHAIN_ID,
  EVM_CHAIN_ID: process.env.REACT_APP_EVM_CHAIN_ID,
} as const;

function determineEnvironment(): Environment {
  const chainId = requiredEnvVars.CHAIN_ID;
  const defaultEnv = environments.mainnet;
  
  if (!chainId) {
    console.warn('CHAIN_ID not set, defaulting to mainnet configuration');
    return defaultEnv;
  }

  const envType = chainId === 'pacific-1' ? 'mainnet' : 'testnet';
  return environments[envType];
}

// Validate all required environment variables are present
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: REACT_APP_${key}`);
  }
});

const currentEnv = determineEnvironment();

export const CONFIG = {
  ENVIRONMENT_ID: requiredEnvVars.ENVIRONMENT_ID,
  
  // Network Configuration
  CHAIN_ID: requiredEnvVars.CHAIN_ID,
  EVM_CHAIN_ID: parseInt(requiredEnvVars.EVM_CHAIN_ID),
  RPC_URL: requiredEnvVars.SEI_EVM_RPC_URL,
  API_URL: requiredEnvVars.SEI_API_URL,
  BLOCK_EXPLORER: currentEnv.blockExplorer,
  
  // IBC Configuration
  IBC_PRECOMPILE: '0x0000000000000000000000000000001009' as const,
  DEFAULT_GAS_LIMIT: BigInt(2000000),
  TIMEOUT_MINUTES: 10,
  BLOCK_TIME_SECONDS: 0.4,
  
  // API Configuration
  API: {
    BASE_URL: currentEnv.api.baseUrl,
    WALLET_API: currentEnv.api.walletApi, // Added wallet API URL
    TIMEOUT: 30000,
    ENDPOINTS: {
      IBC_TRANSFER: '/ibc/transfer/v1',
      BANK: '/cosmos/bank/v1beta1',
      IBC_CLIENT: '/ibc/core/client/v1',
    }
  },

  // Network Details
  NETWORK: {
    NAME: currentEnv.network.chainName,
    NATIVE_CURRENCY: currentEnv.network.nativeCurrency,
    BLOCK_EXPLORER_URLS: currentEnv.network.blockExplorerUrls
  }
} as const;