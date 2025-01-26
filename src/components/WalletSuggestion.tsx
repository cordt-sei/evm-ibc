// src/components/WalletSuggestion.tsx
import React, { useState } from 'react';
import { ChainInfo, KeplrWindow, KeplrChainInfo } from '../types';
import { CONFIG } from '../config/config';

interface WalletSuggestionProps {
  chain: ChainInfo;
  onWalletSelect: (address: string) => void;
}

const WalletSuggestion: React.FC<WalletSuggestionProps> = ({ chain, onWalletSelect }) => {
  const [error, setError] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const keplrWindow = window as KeplrWindow;

  const getKeplrChainConfig = (chainInfo: ChainInfo): KeplrChainInfo => {
    const rpcEndpoint = chainInfo.chainData.apis?.rpc?.[0]?.address;
    const restEndpoint = chainInfo.chainData.apis?.rest?.[0]?.address;
    const feeDenom = chainInfo.chainData.fees?.fee_tokens?.[0]?.denom;

    if (!rpcEndpoint || !restEndpoint || !feeDenom) {
      throw new Error('Missing required chain configuration');
    }

    return {
      chainId: chain.chainId,
      chainName: chain.chainName,
      rpc: rpcEndpoint,
      rest: restEndpoint,
      bip44: { coinType: chain.slip44 },
      bech32Config: {
        bech32PrefixAccAddr: chain.bech32Prefix,
        bech32PrefixAccPub: `${chain.bech32Prefix}pub`,
        bech32PrefixValAddr: `${chain.bech32Prefix}valoper`,
        bech32PrefixValPub: `${chain.bech32Prefix}valoperpub`,
        bech32PrefixConsAddr: `${chain.bech32Prefix}valcons`,
        bech32PrefixConsPub: `${chain.bech32Prefix}valconspub`
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
      await keplrWindow.keplr.enable(chain.chainId);
      
      const offlineSigner = keplrWindow.keplr.getOfflineSigner(chain.chainId);
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
          Connect your {chain.chainName} wallet to auto-fill receiving address
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