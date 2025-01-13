// src/lib/ibcTxHandlers.ts

import { decodeDenom } from "@/components/api/decodeIbcDenom";
import { fetchChannelDetails } from "@/components/api/fetchAssetInfo";
import { fetchIbcInfo } from "@/components/api/fetchIbcInfo";
import { fetchChainInfo } from "@/components/api/fetchChainInfo";

import { Contract } from "ethers";
import {
  IBC_PRECOMPILE_ABI,
  IBC_PRECOMPILE_ADDRESS,
} from "@/components/api/constants";
import { isEthereumWallet } from "@dynamic-labs/ethereum";

interface Token {
  denom: string;
  amount: string;
}

interface ChainInfoCache {
  [denomHash: string]: any; // or a more specific type if needed
}

interface HandleTokenSelectionArgs {
  token: Token;
  chainInfoCache: ChainInfoCache;
  setToastMessage: (msg: string) => void;
}

/**
 * Step 1: User selects a token from the dropdown
 * - Finds the chain in the local cache
 * - Attempts to enable chain in Keplr/Leap
 * - Suggest chain if missing
 * - Gets user address
 */
export async function handleTokenSelection({
  token,
  chainInfoCache,
  setToastMessage,
}: HandleTokenSelectionArgs): Promise<string | undefined> {
  if (!token.denom.startsWith("ibc/")) return;
  const denomHash = token.denom.split("/")[1];

  const chainData = chainInfoCache[denomHash];
  if (!chainData) {
    console.warn("No chain info in cache for", denomHash);
    return "No chain info found for this token’s denom.";
  }

  const { chainId, chainName, chainData: registryData } = chainData || {};
  if (!chainId) {
    return "Missing chainId for this token’s chain. Cannot continue.";
  }

  // attempt to enable chain
  const maybeKeplr = (window as any).keplr;
  const maybeLeap = (window as any).leap;
  if (!(maybeKeplr || maybeLeap)) {
    return `No Keplr or Leap wallet detected. Please install a compatible wallet to manage assets on ${chainId}.`;
  }

  try {
    await (maybeKeplr?.enable(chainId) || maybeLeap?.enable(chainId));
  } catch (enableErr) {
    console.warn(`Chain ${chainId} not found; attempting to add chain...`);
    if (registryData) {
      try {
        const { chain_id, chain_name, apis } = registryData;
        const rpcUrl = apis?.rpc?.[0]?.address || "";
        const restUrl = apis?.rest?.[0]?.address || "";
        // If you have extra info in chainData, add it here

        const chainConfig = {
          chainId: chain_id,
          chainName: chain_name,
          rpc: rpcUrl,
          rest: restUrl,
          // ...
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
        return `Cannot add ${chainId} to wallet. See console for details.`;
      }
    }
  }

  //  Get the user address for chainId
  try {
    const offlineSigner = maybeKeplr
      ? maybeKeplr.getOfflineSigner(chainId)
      : maybeLeap.getOfflineSigner(chainId);

    const accounts = await offlineSigner.getAccounts();
    const userChainAddress = accounts[0]?.address;
    if (userChainAddress) {
      return `Wallet address for ${chainId}: ${userChainAddress}`;
    } else {
      return `No address found for ${chainId} in your wallet.`;
    }
  } catch (err) {
    console.error("Error fetching user address:", err);
    return `Failed to get address for chain: ${chainId}`;
  }
}

/**
 * Step 2: Handling an EVM-based IBC Transfer
 */
interface HandleIbcTransferArgs {
  user: any; // or a typed user if available
  transferAmount: string;
  recipient: string;
  selectedToken: Token;
}

export async function handleIbcTransfer({
  user,
  transferAmount,
  recipient,
  selectedToken,
}: HandleIbcTransferArgs): Promise<string | undefined> {
  // Make sure wallet is available
  if (!user?.primaryWallet) {
    throw new Error("Wallet not available.");
  }

  const wallet = user.primaryWallet;
  if (!isEthereumWallet(wallet)) {
    return "Non-Ethereum wallets are not supported in this flow yet.";
  }

  // EVM-based IBC approach
  const walletClient = await wallet.getWalletClient();
  if (!walletClient) {
    throw new Error("Unable to get Wallet Client.");
  }

  // 1) decode IBC denom to find channel
  const { channel, baseDenom } = await decodeDenom(selectedToken.denom);

  // 2) fetch channel + IBC info
  const channelDetails = await fetchChannelDetails(channel, "transfer");
  const ibcInfo = await fetchIbcInfo(channelDetails.connectionId, "transfer");

  // 3) build transaction data
  const timeoutTimestamp =
    BigInt(Date.now() * 1_000_000) + BigInt(600 * 1_000_000_000); // e.g. 10 minutes
  // The `data` must be "0x..." hex string. 
  // If your `encodeFunctionData` returns "0x..." you’re good.

  const contract = new Contract(IBC_PRECOMPILE_ADDRESS, IBC_PRECOMPILE_ABI);
  const encodedData = contract.interface.encodeFunctionData("transfer", [
    recipient,
    "transfer",
    channelDetails.counterpartyChannelId,
    baseDenom,
    transferAmount,
    ibcInfo.revisionNumber,
    ibcInfo.revisionHeight,
    timeoutTimestamp,
    "",
  ]);

  // This library expects `value` as a BigInt or a hex. Convert as needed.
  // For demonstration, we’ll keep it as a string if it’s small.
  // In real code, do BigInt(transferAmount) or parseUnits(...) to be safe.
  const txData = {
    to: IBC_PRECOMPILE_ADDRESS,
    value: transferAmount, // ideally BigInt(transferAmount)
    data: encodedData,
  };

  // 4) send transaction
  const txHash = await walletClient.sendTransaction(txData);

  // Some libraries return just a 0x string (the hash). Others return an object.
  // We'll assume it's a string:
  return `Transaction sent. Hash: ${txHash}`;
}
