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
import { fetchChannelDetails } from "@/components/api/fetchAssetInfo";
import { fetchIbcInfo } from "@/components/api/fetchIbcInfo";
import { decodeDenom } from "@/components/api/decodeIbcDenom";
import {
  IBC_PRECOMPILE_ABI,
  IBC_PRECOMPILE_ADDRESS,
} from "@/components/api/constants";

// NEW IMPORT
import { fetchChainInfo } from "@/components/api/fetchChainInfo";
import { constructIbcTxMsg } from "@/components/api/constructIbcTxMsg";

interface WalletBalance {
  denom: string;
  amount: string;
}

// In a real-world app, you would map your known channel IDs to chain info, or dynamically fetch them
// This is a demonstration for the "channel => chain" flow:
interface ChainDataCache {
  [denomHash: string]: {
    chainId: string;
    chainName?: string;
    chainData?: any;
  };
}

export default function HomePage() {
  const { user, setShowAuthFlow } = useDynamicContext();
  const isAuthenticated = Boolean(user?.primaryWallet?.address);

  const [selectedToken, setSelectedToken] = useState<WalletBalance | null>(null);
  const [transferAmount, setTransferAmount] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [userTokens, setUserTokens] = useState<WalletBalance[]>([]);
  const [loading, setLoading] = useState(false);

  // Cache of chain data, keyed by "denomHash" or some unique IBC identifier
  const [chainInfoCache, setChainInfoCache] = useState<ChainDataCache>({});

  const methods = useForm<{ recipient: string }>();

  // 1. Fetch user IBC balances once authenticated
  // 2. For each IBC denom, decode its path to find the channel, then fetch chain info
  //    so we can store that in chainInfoCache for prompting chain addition in wallets later.
  useEffect(() => {
    (async () => {
      if (!isAuthenticated || !user?.primaryWallet?.address) return;

      setLoading(true);
      try {
        const balances = await fetchWalletBalances(user.primaryWallet.address);
        setUserTokens(balances);

        // Pre-fetch and cache chain info for each IBC denom
        const updatedCache: ChainDataCache = { ...chainInfoCache };
        for (const balance of balances) {
          if (!balance.denom.startsWith("ibc/")) continue;
          const denomHash = balance.denom.split("/")[1];

          // If we already have chain info cached for this denomHash, skip
          if (updatedCache[denomHash]) continue;

          try {
            // Decode the path: see which channel it used
            const { channel, baseDenom } = await decodeDenom(balance.denom);

            // fetch counterparty chain info (the "home" chain of that baseDenom)
            // Here, we assume the channel in the path is the "channelId" for the counterparty chain
            // In some real networks, you might have multiple channels or a different mapping.
            // Also, the port is typically "transfer".
            const chainInfo = await fetchChainInfo(channel, "transfer");

            updatedCache[denomHash] = {
              chainId: chainInfo.chainId,
              chainName: chainInfo.chainName,
              chainData: chainInfo.chainData,
            };
          } catch (e) {
            console.warn(`Could not fetch chain info for denom=${balance.denom}`, e);
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

  /**
   * Called when user selects an asset from the dropdown.
   */
  const handleSelectToken = async (token: WalletBalance) => {
    setSelectedToken(token);

    // Attempt to fetch the user’s address for the chain that corresponds to this token’s "home chain".
    // 1) Extract denomHash
    if (!token.denom.startsWith("ibc/")) return;
    const denomHash = token.denom.split("/")[1];

    // 2) Lookup chain in the cache
    const chainData = chainInfoCache[denomHash];
    if (!chainData) {
      // Something might have gone wrong or chain info doesn't exist
      console.warn("No chain info in cache for", denomHash);
      return;
    }

    const { chainId, chainName } = chainData;

    // 3) Check if user has connected a cosmos wallet that can handle chainId
    //    e.g., keplr or leap
    const maybeKeplr = (window as any).keplr;
    const maybeLeap = (window as any).leap;

    if (!(maybeKeplr || maybeLeap)) {
      setToastMessage(
        `No Keplr or Leap wallet detected. Please install a compatible wallet to manage assets on ${chainId}.`
      );
      return;
    }

    // 4) Attempt to enable the chain
    try {
      await (maybeKeplr?.enable(chainId) || maybeLeap?.enable(chainId));
    } catch (enableErr) {
      console.warn(`Chain ${chainId} not found in wallet; attempting to add chain...`);

      // If you have the chain registry data, you can build the config here
      // to suggest the chain. The structure below is a minimal example.
      if (chainData.chainData) {
        try {
          const { chain_id, chain_name, apis } = chainData.chainData; // see chain-registry structure
          // We might have apis.rpc, apis.rest, etc.
          const rpcUrl = apis?.rpc?.[0]?.address || "";
          const restUrl = apis?.rest?.[0]?.address || "";
          const baseDenom = chainData.staking?.staking_tokens[0]?.denom || "Unknown";
          const nativeDenomExponent = assetData.assets[0]?.denom_units.slice(-1)[0];
          const decimals = nativeDenomExponent ? nativeDenomExponent.exponent : "Unknown";

          const chainConfig = {
            chainId: chain_id,
            chainName: chain_name,
            rpc: rpcUrl,
            rest: restUrl,
            addressPrefix: ,
            baseDenom: baseDenom,
            cointype: cointype,
            exponent: decimals,

            // ...
            // build out the rest of the config as needed
          };

          if (maybeKeplr) {
            await maybeKeplr.experimentalSuggestChain(chainConfig);
            await maybeKeplr.enable(chainId);
          } else if (maybeLeap) {
            await maybeLeap.experimentalSuggestChain(chainConfig);
            await maybeLeap.enable(chainId);
          }
        } catch (suggestErr) {
          console.error("Failed to suggest chain:", suggestErr);
          setToastMessage(`Cannot add ${chainId} to wallet. See console for details.`);
          return;
        }
      }
    }

    // 5) Now chain should be enabled. Try to read user address from the wallet for this chain.
    //    getOfflineSigner or getKey, depending on wallet APIs
    try {
      const offlineSigner = maybeKeplr
        ? maybeKeplr.getOfflineSigner(chainId)
        : maybeLeap.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
      const userChainAddress = accounts[0]?.address;
      if (userChainAddress) {
        setToastMessage(`Wallet address for ${chainId}: ${userChainAddress}`);
      } else {
        setToastMessage(`No address found for ${chainId} in your wallet.`);
      }
    } catch (err) {
      console.error("Error while fetching user address for chain:", err);
      setToastMessage(`Failed to get address for chain: ${chainId}`);
    }
  };

  /**
   * Your existing handleTransfer logic
   */
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

        // EVM-based IBC approach
        const channelDetails = await fetchChannelDetails(channelId, "transfer");
        const ibcInfo = await fetchIbcInfo(channelDetails.connectionId, "transfer");

        // Construct your transaction data
        const timeoutTimestamp =
          BigInt(Date.now() * 1_000_000) + BigInt(600 * 1_000_000_000); // 10 min

        // Alternatively, if you have a more direct approach for building IBC txs, do so
        const txData = {
          to: IBC_PRECOMPILE_ADDRESS,
          value: transferAmount, // Make sure it's in correct denom
          data: new Contract(IBC_PRECOMPILE_ADDRESS, IBC_PRECOMPILE_ABI).interface.encodeFunctionData(
            "transfer",
            [
              data.recipient,
              "transfer",
              channelDetails.counterpartyChannelId,
              selectedToken.denom,
              transferAmount,
              ibcInfo.revisionNumber,
              ibcInfo.revisionHeight,
              timeoutTimestamp,
              "",
            ]
          ),
        };

        const tx = await walletClient.sendTransaction(txData);
        setToastMessage(`Transaction sent. Hash: ${tx.hash}`);
      } else {
        setToastMessage("Non-Ethereum wallets are not supported in this flow yet.");
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
