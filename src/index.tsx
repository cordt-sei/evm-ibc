// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import App from './components/App';
import { dynamicClient } from './config/dynamicClient';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
 <DynamicContextProvider settings={dynamicClient}>
   <App />
 </DynamicContextProvider>
);