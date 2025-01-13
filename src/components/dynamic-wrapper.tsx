// src/components/dynamic-wrapper.tsx
"use client";

import React from "react";
import {
  DynamicContextProvider,
  DynamicWidget, // If you want the widget always rendered
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { mainnet } from "viem/chains";

interface ProviderWrapperProps {
  children: React.ReactNode;
}

// Example WAGMI + viem config
const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

// For React Query
const queryClient = new QueryClient();

export default function ProviderWrapper({ children }: ProviderWrapperProps) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "YOUR_ENVIRONMENT_ID", // Replace with actual env ID
        walletConnectors: [], // Add connectors as needed
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            {/*
              (Optional) If you want the DynamicWidget to appear on every page,
              leave it here. Otherwise, remove it and place <DynamicWidget />
              only where you want it (e.g., a 'wallet' page or Drawer).
            */}
            {children}
            <DynamicWidget />
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
