// src/config/providers.ts
import { JsonRpcProvider } from 'ethers';
import { environments } from './environments';

// Create provider with proper error handling
function createProvider(): JsonRpcProvider {
  const rpcUrl = process.env.REACT_APP_SEI_RPC_URL;
  if (!rpcUrl) {
    throw new Error('RPC URL environment variable is not set');
  }
  return new JsonRpcProvider(rpcUrl);
}

export const provider = createProvider();