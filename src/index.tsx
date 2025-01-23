import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <DynamicContextProvider
    settings={{
      environmentId: process.env.REACT_APP_ENVIRONMENT_ID || '', // Ensure the env ID is correct.
      events: {
        onAuthInit: (args) => console.log('onAuthInit triggered:', args),
        onAuthSuccess: (args) => {
          console.log('onAuthSuccess triggered:', args);
          console.log('SDK initialization successful.');
        },
        onAuthFailure: (args) => console.error('onAuthFailure triggered:', args),
      },
    }}
  >
    <App />
  </DynamicContextProvider>
);
