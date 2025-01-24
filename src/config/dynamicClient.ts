// src/config/dynamicClient.ts
import { createClient } from '@dynamic-labs/client';

// Create Dynamic client with proper error handling
function createDynamicClient() {
  const environmentId = process.env.REACT_APP_ENVIRONMENT_ID;
  if (!environmentId) {
    throw new Error('Dynamic environment ID is not set');
  }

  return createClient({
    environmentId,
    appLogoUrl: 'https://sei.io/favicon.ico',
    appName: 'IBC Return Transfer'
  });
}

export const dynamicClient = createDynamicClient();