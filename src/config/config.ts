// src/config/config.ts
import { Environment, environments } from './environments';

// Define required environment variables and their types
interface RequiredEnvVars {
  ENVIRONMENT_ID: string;
  SEI_API_URL: string;
  SEI_EVM_RPC_URL: string;
  CHAIN_ID: string;
  EVM_CHAIN_ID: string;
}

// Validate and get environment variables with type checking
function getRequiredEnvVars(): RequiredEnvVars {
  const vars = {
    ENVIRONMENT_ID: process.env.REACT_APP_ENVIRONMENT_ID,
    SEI_API_URL: process.env.REACT_APP_SEI_API_URL,
    SEI_EVM_RPC_URL: process.env.REACT_APP_EVM_RPC_URL,
    CHAIN_ID: process.env.REACT_APP_CHAIN_ID,
    EVM_CHAIN_ID: process.env.REACT_APP_EVM_CHAIN_ID,
  };

  // Validate all required environment variables are present
  Object.entries(vars).forEach(([key, value]) => {
    if (!value) {
      throw new Error(`Missing required environment variable: REACT_APP_${key}`);
    }
  });

  return vars as RequiredEnvVars;
}

function determineEnvironment(chainId: string): Environment {
  const defaultEnv = environments.mainnet;
  
  if (!chainId) {
    console.warn('CHAIN_ID not set, defaulting to mainnet configuration');
    return defaultEnv;
  }

  const envType = chainId === 'pacific-1' ? 'mainnet' : 'testnet';
  return environments[envType];
}

const requiredEnvVars = getRequiredEnvVars();
const currentEnv = determineEnvironment(requiredEnvVars.CHAIN_ID);

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
    WALLET_API: currentEnv.api.walletApi,
    TIMEOUT: 30000,
    ENDPOINTS: {
      IBC_TRANSFER: '/ibc/apps/transfer/v1',
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