// src/config/providers.ts
import { JsonRpcProvider } from 'ethers';
import { environments } from './environments';

const ENV = (process.env.REACT_APP_ENVIRONMENT || 'mainnet') as Environment;

export const provider = new JsonRpcProvider(environments[ENV].rpcUrl);