// global.d.ts
import { DynamicClient } from '@dynamic-labs/sdk-react-core';

declare global {
  interface Window {
    dynamicClient: DynamicClient;
  }
}
