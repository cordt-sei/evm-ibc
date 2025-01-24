// src/config/index.ts

// The API_CONFIG object contains all configuration values needed for interacting
// with the Sei blockchain and IBC functionality. Each value serves a specific
// purpose in the application.
export const API_CONFIG = {
  // Base URL for all API requests to the Sei network
  BASE_URL: 'https://api.sei.basementnodes.ca',

  // The IBC precompile contract address that handles token transfers
  IBC_PRECOMPILE: '0x0000000000000000000000000000001009' as const,

  // Default gas limit for transactions, set high enough to cover IBC operations
  DEFAULT_GAS_LIMIT: BigInt(2000000),

  // Timeout duration for IBC transfers in minutes
  TIMEOUT_MINUTES: 10,

  // Average block time for the Sei network in seconds
  BLOCK_TIME_SECONDS: 0.4
} as const;

// Derive types from the configuration for use throughout the application
export type ApiConfig = typeof API_CONFIG;
export type BaseUrl = typeof API_CONFIG.BASE_URL;
export type IbcPrecompile = typeof API_CONFIG.IBC_PRECOMPILE;

// Re-export other configurations to maintain a single import point
export { environments } from './environments';
export { provider } from './providers';
export { dynamicClient } from './dynamicClient';

// Helper functions to access configuration values safely
export function getTimeoutHeight(currentHeight: number): number {
  const blocksPerMinute = 60 / API_CONFIG.BLOCK_TIME_SECONDS;
  const timeoutBlocks = Math.ceil(blocksPerMinute * API_CONFIG.TIMEOUT_MINUTES);
  return currentHeight + timeoutBlocks;
}

export function getTimeoutTimestamp(): bigint {
  const currentTime = Date.now();
  const timeoutMillis = currentTime + (API_CONFIG.TIMEOUT_MINUTES * 60 * 1000);
  return BigInt(timeoutMillis) * BigInt(1_000_000); // Convert to nanoseconds
}