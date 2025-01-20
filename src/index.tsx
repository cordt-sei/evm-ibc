// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <DynamicContextProvider
    settings={{
      environmentId: process.env.REACT_APP_ENVIRONMENT_ID || '',
    }}
  >
    <App />
  </DynamicContextProvider>
);
