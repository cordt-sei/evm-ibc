// src/config/constants.ts
// This file holds all constant configuration values that don't depend on environment
export const API_CONSTANTS = {
  IBC_PRECOMPILE: '0x0000000000000000000000000000001009',
  DEFAULT_GAS_LIMIT: BigInt(2000000),
  TIMEOUT_MINUTES: 10,
  BLOCK_TIME_SECONDS: 0.4
} as const;