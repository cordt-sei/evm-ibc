// src/constants/index.ts
export const IBC_CONSTANTS = {
  TIMEOUT_MINUTES: 10,
  BLOCK_TIME_SECONDS: 0.4,
  PORT_ID: 'transfer',
  PATH_REGEX: /^(transfer\/channel-\d+)$/
 };
 
 export const CHAIN_CONSTANTS = {
  SEI: {
    CHAIN_ID: 'atlantic-2',
    DENOM: 'usei',
    DECIMALS: 6
  }
 };
 
 export const ERROR_MESSAGES = {
  INVALID_ADDRESS: 'Invalid destination address',
  MULTI_HOP: 'Token has been through multiple IBC transfers',
  INSUFFICIENT_BALANCE: 'Insufficient balance',
  TIMEOUT: 'Transaction timed out'
 };