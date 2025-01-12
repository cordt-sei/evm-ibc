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
import { isEthereumWallet } from "@dynamic-labs/ethereum";
import { Contract } from "ethers";
import { fetchWalletBalances } from "@/components/api/fetchWalletBalances";
import { fetchChannelDetails } from "@/components/api/fetchChannelDetails";
import { fetchIbcInfo } from "@/components/api/fetchIbcInfo";
import { IBC_PRECOMPILE_ABI, IBC_PRECOMPILE_ADDRESS } from "@/components/api/constants";

export default function HomePage() {
  const { user, setShowAuthFlow } = useDynamicContext();
  const isAuthenticated = Boolean(user?.primaryWallet?.address);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [transferAmount, setTransferAmount] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [userTokens, setUserTokens] = useState<{ denom: string; amount: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const methods = useForm<{ recipient: string }>();

  // Fetch wallet balances when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user.primaryWallet?.address) {
      setLoading(true);
      fetchWalletBalances(user.primaryWallet.address)
        .then((balances) => {
          setUserTokens(balances);
        })
        .catch((error) => {
          console.error("Failed to fetch wallet balances:", error);
          setToastMessage("Failed to load balances. Please try again.");
        })
        .finally(() => setLoading(false));
    }
  }, [isAuthenticated, user?.primaryWallet?.address]);

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
      const wallet = user.primaryWallet;

      if (!wallet) throw new Error("Wallet not available.");

      if (isEthereumWallet(wallet)) {
        const walletClient = await wallet.getWalletClient();
        if (!walletClient) throw new Error("Unable to get Wallet Client.");

        // Fetch IBC channel details dynamically
        const channelDetails = await fetchChannelDetails("channel-1", "transfer");

        // Fetch IBC revision and height
        const ibcInfo = await fetchIbcInfo(channelDetails.connectionId);

        const timeoutTimestamp = BigInt(Date.now() * 1_000_000) + BigInt(600 * 1_000_000_000); // 10 minutes from now
        const txData = {
          to: IBC_PRECOMPILE_ADDRESS,
          value: transferAmount, // Ensure amount is in smallest denomination
          data: new Contract(IBC_PRECOMPILE_ADDRESS, IBC_PRECOMPILE_ABI).interface.encodeFunctionData(
            "transfer",
            [
              data.recipient,
              "transfer",
              channelDetails.counterpartyChannelId,
              selectedToken,
              transferAmount,
              ibcInfo.revisionNumber,
              ibcInfo.revisionHeight,
              timeoutTimestamp,
              "", // Memo (optional)
            ]
          ),
        };

        // Send the transaction
        const tx = await walletClient.sendTransaction(txData);

        setToastMessage(`Transaction sent. Hash: ${tx.hash}`);
      } else {
        setToastMessage("Non-Ethereum wallets are not supported.");
      }
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

      {/* Wallet Drawer */}
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
              <Button>{selectedToken ? `Selected: ${selectedToken}` : "Select Token"}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {loading ? (
                <p>Loading...</p>
              ) : (
                userTokens.map((token) => (
                  <DropdownMenuItem
                    key={token.denom}
                    onClick={() => setSelectedToken(token.denom)}
                  >
                    {`${token.denom} (${token.amount})`}
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Recipient Address Form */}
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(handleTransfer)}
              className="mt-4"
            >
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

              <Button type="submit" className="mt-4" disabled={loading || !selectedToken}>
                {loading ? "Processing..." : `Transfer ${selectedToken || "Token"}`}
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
