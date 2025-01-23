// src/types/config.ts
export interface EnvironmentConfig {
  rpcUrl: string;
  chainId: string;
  explorer: string;
 }
 
 export interface APIConfig {
  baseUrl: string;
  timeout: number;
  headers: Record<string, string>;
 }
 
 // src/types/dynamic.ts
 import { DynamicContextProps } from '@dynamic-labs/sdk-react-core';
 
 export interface DynamicConfig extends DynamicContextProps {
  evmNetworks: {
    chainId: number;
    name: string;
    rpcUrl: string;
  }[];
 }
 
 // src/types/api.ts
 export interface APIResponse<T> {
  data: T;
  error?: string;
 }
 
 export interface DenomTraceResponse {
  denom_trace: {
    path: string;
    base_denom: string;
  };
 }