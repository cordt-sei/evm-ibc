import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Drawer } from "@/components/ui/drawer";
import { FormProvider, useForm } from "react-hook-form";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export default function HomePage() {
  const { user, connectWallet, isAuthenticated } = useDynamicContext();
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const methods = useForm();
  const tokens = ["Token A", "Token B", "Token C"];

  const handleTransfer = (data: { recipient: string }) => {
    if (!isAuthenticated) {
      setToastMessage("Please connect a wallet to proceed.");
      return;
    }
    if (!selectedToken || !data.recipient) {
      setToastMessage("Please select a token and enter a valid address.");
      return;
    }
    setToastMessage("Transaction initiated. Please check your wallet.");
    // TODO: Implement IBC transfer logic here.
  };

  return (
    <div className="p-6">
      {/* Navigation Menu */}
      <NavigationMenu>
        <NavigationMenuItem>Wallet Splash</NavigationMenuItem>
        <NavigationMenuItem>Quick Doc</NavigationMenuItem>
        <NavigationMenuItem>Transfers</NavigationMenuItem>
      </NavigationMenu>

      {/* Wallet Drawer */}
      <Drawer>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={connectWallet}
        >
          {isAuthenticated ? `Connected: ${user?.wallet?.address || "N/A"}` : "Connect Wallet"}
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
              <Button>Select Token</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {tokens.map((token) => (
                <DropdownMenuItem key={token} onClick={() => setSelectedToken(token)}>
                  {token}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Recipient Address Form */}
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleTransfer)} className="mt-4">
              <div>
                <input
                  {...methods.register("recipient", { required: "Recipient address is required." })}
                  placeholder="Recipient Address"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50"
                />
                {methods.formState.errors.recipient && (
                  <p className="text-red-500 text-sm">
                    {methods.formState.errors.recipient.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="mt-4">
                Transfer {selectedToken || "Token"}
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
