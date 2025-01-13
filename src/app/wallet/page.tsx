// src/app/wallet/page.tsx
"use client"; // Because we use DynamicWidget

import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export default function WalletPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Welcome to Your Wallet</h1>
      <p className="mb-4">
        This page holds the <strong>DynamicWidget</strong> directly, so you can
        connect or manage your wallet here without the drawer.
      </p>
      {/* The widget is always visible here */}
      <DynamicWidget />
    </div>
  );
}
