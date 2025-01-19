import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';

// Ensure your environment variable is properly set up
const environmentId = process.env.REACT_APP_ENVIRONMENT_ID;

if (!environmentId) {
  throw new Error(
    'REACT_APP_ENVIRONMENT_ID is not set. Please check your environment variables.'
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found.');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <DynamicContextProvider
    settings={{
      environmentId,
      events: {
        onAuthSuccess: (args) => {
          console.log('Wallet connected successfully:', args);
        },
      },
    }}
  >
    <App />
  </DynamicContextProvider>
);
