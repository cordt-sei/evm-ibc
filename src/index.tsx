import React from 'react';
import ReactDOM from 'react-dom';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import App from './components/App';

ReactDOM.render(
  <DynamicContextProvider
    settings={{
      appId: 'your-dynamic-app-id', // Replace with your Dynamic app ID
      environmentId: 'production', // Use 'development' or 'production' based on your setup
    }}
  >
    <App />
  </DynamicContextProvider>,
  document.getElementById('root')
);
