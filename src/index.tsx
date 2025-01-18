// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';

// Ensure the environment variable is available
const environmentId = process.env.REACT_APP_ENVIRONMENT_ID;
if (!environmentId) {
  throw new Error('Environment ID is missing. Check your .env file.');
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <DynamicContextProvider
    settings={{
      environmentId,
    }}
  >
    <App />
  </DynamicContextProvider>
);
