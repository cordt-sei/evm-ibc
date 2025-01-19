import { createClient } from '@dynamic-labs/client';

export const dynamicClient = createClient({
  environmentId: process.env.REACT_APP_ENVIRONMENT_ID || '',
  appLogoUrl: 'https://demo.dynamic.xyz/favicon-32x32.png', // Optional
  appName: 'EVM-IBC Transfer', // Optional
});
