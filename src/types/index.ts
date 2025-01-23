// src/types/index.ts
export * from './chain';
export * from './ibc';
export * from './transaction';
export * from './wallet';

// Global environment type extensions
declare global {
  interface Window extends KeplrWindow {}
  
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_SEI_RPC_URL: string;
      REACT_APP_CHAIN_ID: string;
      REACT_APP_ENVIRONMENT_ID: string;
    }
  }
}