"use client";

import React, { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Drawer } from "@/components/ui/drawer";
import { FormProvider, useForm } from "react-hook-form";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { WalletBalance } from "@/types";

import { fetchWalletBalances } from "@/components/api/fetchWalletBalances";
import { decodeDenom } from "@/components/api/decodeIbcDenom";
import { fetchChainInfo } from "@/components/api/fetchChainInfo";

import { handleTokenSelection, handleIbcTransfer } from "@/lib/ibcTxHandlers";

export default function HomePage() {
  const { user, setShowAuthFlow } = useDynamicContext();
  const isAuthenticated = Boolean(user?.primaryWallet?.address);

  const [selectedToken, setSelectedToken] = useState<WalletBalance | null>(null);
  const [transferAmount, setTransferAmount] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [userTokens, setUserTokens] = useState<WalletBalance[]>([]);
  const [loading, setLoading] = useState(false);

  // Cache for chain info keyed by denom-hash or something similar
  const [chainInfoCache, setChainInfoCache] = useState<Record<string, any>>({});

  // React Hook Form
  const methods = useForm<{ recipient: string }>();

  // Fetch user IBC balances and pre-cache chain info
  useEffect(() => {
    (async () => {
      if (!isAuthenticated || !user?.primaryWallet?.address) return;
      setLoading(true);
      try {
        const balances = await fetchWalletBalances(user.primaryWallet.address);
        setUserTokens(balances);

        // Pre-fetch chain info
        const updatedCache = { ...chainInfoCache };
        for (const balance of balances) {
          if (!balance.denom.startsWith("ibc/")) continue;
          const denomHash = balance.denom.split("/")[1];
          if (updatedCache[denomHash]) continue;

          try {
            const { channel } = await decodeDenom(balance.denom);
            const chainInfo = await fetchChainInfo(channel, "transfer");
            updatedCache[denomHash] = chainInfo;
          } catch (err) {
            console.warn(`Could not fetch chain info for ${balance.denom}`, err);
          }
        }
        setChainInfoCache(updatedCache);
      } catch (error) {
        console.error("Failed to fetch wallet balances:", error);
        setToastMessage("Failed to load balances. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user?.primaryWallet?.address]);

  // Called when user selects an asset from the dropdown
  const handleSelectToken = async (token: WalletBalance) => {
    setSelectedToken(token);
    try {
      const msg = await handleTokenSelection({
        token,
        chainInfoCache,
        setToastMessage,
      });
      if (msg) setToastMessage(msg);
    } catch (err) {
      console.error("Error in handleSelectToken logic:", err);
      setToastMessage("Could not select token. See console for details.");
    }
  };

  // Called on form submit
  const handleTransfer = async (data: { recipient: string }) => {
    if (!isAuthenticated) {
      setToastMessage("Please connect a wallet to proceed.");
      setShowAuthFlow(true);
      return;
    }
    if (!selectedToken || !data.recipient || !transferAmount) {
      setToastMessage("Please complete all fields before proceeding.");
      return;
    }

    try {
      setLoading(true);
      const msg = await handleIbcTransfer({
        user,
        transferAmount,
        recipient: data.recipient,
        selectedToken,
      });
      if (msg) setToastMessage(msg);
    } catch (error) {
      console.error("Error during transfer:", error);
      setToastMessage("Failed to initiate transfer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Navigation Menu */}
      <NavigationMenu>
        <NavigationMenuItem>Wallet Splash</NavigationMenuItem>
        <NavigationMenuItem>Quick Doc</NavigationMenuItem>
        <NavigationMenuItem>Transfers</NavigationMenuItem>
      </NavigationMenu>

      {/* Drawer (connect wallet) */}
      <Drawer>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowAuthFlow(true)}
        >
          {isAuthenticated
            ? `Connected: ${user?.primaryWallet?.address || "N/A"}`
            : "Connect Wallet"}
        </button>
      </Drawer>

      {/* Transfer Section */}
      <div className="mt-6">
        <Tabs>
          <TabsList>
            <TabsTrigger value="skip-widget">Skip Widget</TabsTrigger>
            <TabsTrigger value="evm-ibc">EVM-IBC</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mt-4">
          {/* Token Selection Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button>
                {selectedToken ? `Selected: ${selectedToken.denom}` : "Select Token"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {loading ? (
                <p>Loading...</p>
              ) : (
                userTokens.map((token) => (
                  <DropdownMenuItem
                    key={token.denom}
                    onClick={() => handleSelectToken(token)}
                  >
                    {`${token.denom} (${token.amount})`}
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Recipient + Amount Form */}
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleTransfer)} className="mt-4">
              <div>
                <input
                  {...methods.register("recipient", {
                    required: "Recipient address is required.",
                  })}
                  placeholder="Recipient Address"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50"
                />
                {methods.formState.errors.recipient && (
                  <p className="text-red-500 text-sm">
                    {String(methods.formState.errors.recipient.message)}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Amount"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>

              <Button
                type="submit"
                className="mt-4"
                disabled={loading || !selectedToken}
              >
                {loading
                  ? "Processing..."
                  : `Transfer ${selectedToken?.denom || "Token"}`}
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>

      {/* Toast Notifications */}
      {toastMessage && <Toast>{toastMessage}</Toast>}
    </div>
  );
}
