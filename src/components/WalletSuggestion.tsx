// src/components/WalletSuggestion.tsx
import React, { useState } from 'react';
import { ChainInfo, KeplrWindow, KeplrChainInfo, ExtendedChain } from '../types';
import { CONFIG } from '../config/config';

interface WalletSuggestionProps {
  chain: ExtendedChain;  // Changed from ChainInfo to ExtendedChain
  onWalletSelect: (address: string) => void;
}

const WalletSuggestion: React.FC<WalletSuggestionProps> = ({ chain, onWalletSelect }) => {
  const [error, setError] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const keplrWindow = window as KeplrWindow;

  const getKeplrChainConfig = (chainInfo: ExtendedChain): KeplrChainInfo => {
    const rpcEndpoint = chainInfo.apis?.rpc?.[0]?.address;
    const restEndpoint = chainInfo.apis?.rest?.[0]?.address;
    const feeDenom = chainInfo.fees?.fee_tokens?.[0]?.denom;

    if (!rpcEndpoint || !restEndpoint || !feeDenom) {
      throw new Error('Missing required chain configuration');
    }

    // Convert ExtendedChain to ChainInfo format for Keplr
    const chainData: ChainInfo = {
      chainId: chain.chain_id,
      chainName: chain.pretty_name || chain.chain_name,
      bech32Prefix: chain.bech32_prefix,
      slip44: chain.slip44 || 118,
      chainData: chain,
      staking: chain.staking?.staking_tokens?.[0]?.denom,
      evmChainId: chain.evmChainId || CONFIG.EVM_CHAIN_ID
    };

    return {
      chainId: chainData.chainId,
      chainName: chainData.chainName,
      rpc: rpcEndpoint,
      rest: restEndpoint,
      bip44: { coinType: chainData.slip44 },
      bech32Config: {
        bech32PrefixAccAddr: chainData.bech32Prefix,
        bech32PrefixAccPub: `${chainData.bech32Prefix}pub`,
        bech32PrefixValAddr: `${chainData.bech32Prefix}valoper`,
        bech32PrefixValPub: `${chainData.bech32Prefix}valoperpub`,
        bech32PrefixConsAddr: `${chainData.bech32Prefix}valcons`,
        bech32PrefixConsPub: `${chainData.bech32Prefix}valconspub`
      },
      currencies: [{
        coinDenom: feeDenom.toUpperCase(),
        coinMinimalDenom: feeDenom,
        coinDecimals: CONFIG.NETWORK.NATIVE_CURRENCY.decimals
      }],
      feeCurrencies: [{
        coinDenom: feeDenom.toUpperCase(),
        coinMinimalDenom: feeDenom,
        coinDecimals: CONFIG.NETWORK.NATIVE_CURRENCY.decimals,
        gasPriceStep: {
          low: 0.01,
          average: 0.025,
          high: 0.04
        }
      }],
      stakeCurrency: {
        coinDenom: feeDenom.toUpperCase(),
        coinMinimalDenom: feeDenom,
        coinDecimals: CONFIG.NETWORK.NATIVE_CURRENCY.decimals
      }
    };
  };

  const connectKeplr = async () => {
    setError(null);
    setConnecting(true);
    
    try {
      if (!keplrWindow.keplr) {
        throw new Error(
          'Keplr extension not found. Please install it from the Chrome Web Store.'
        );
      }

      const keplrConfig = getKeplrChainConfig(chain);

      await keplrWindow.keplr.experimentalSuggestChain(keplrConfig);
      await keplrWindow.keplr.enable(chain.chain_id);
      
      const offlineSigner = keplrWindow.keplr.getOfflineSigner(chain.chain_id);
      const accounts = await offlineSigner.getAccounts();
      
      if (accounts[0]) {
        onWalletSelect(accounts[0].address);
      } else {
        throw new Error('No accounts found in Keplr');
      }
    } catch (err) {
      console.error('Keplr connection error:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect to Keplr');
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-blue-700">
          Connect your {chain.chain_name} wallet to auto-fill receiving address
        </span>
        <button
          onClick={connectKeplr}
          disabled={connecting}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            connecting
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {connecting ? 'Connecting...' : 'Connect Keplr'}
        </button>
      </div>
      {error && (
        <div className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};

export default WalletSuggestion;