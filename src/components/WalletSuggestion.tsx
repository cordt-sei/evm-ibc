// src/components/WalletSuggestion.tsx
import React, { useState } from 'react';
import { Asset, Chain } from '@chain-registry/types';
import { ChainInfo, KeplrWindow, KeplrChainInfo, KeplrCurrency } from '../types';
import { getAssetByDenom } from '@chain-registry/utils';

interface WalletSuggestionProps {
  chain: ChainInfo;
  onWalletSelect: (address: string) => void;
}

const WalletSuggestion: React.FC<WalletSuggestionProps> = ({ chain, onWalletSelect }) => {
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const keplrWindow = window as KeplrWindow;

  const createAssetFromFeeToken = (token: { denom: string; fixed_min_gas_price?: number }, chainName: string): Asset => {
    // Create a proper Asset structure that matches the Chain Registry schema
    return {
      // Required properties for any Chain Registry asset
      denom_units: [
        {
          denom: token.denom,
          exponent: 0
        },
        {
          denom: token.denom.replace(/^u/, ''),
          exponent: 6
        }
      ],
      base: token.denom,
      name: token.denom.replace(/^u/, '').toUpperCase(),
      display: token.denom.replace(/^u/, ''),
      symbol: token.denom.replace(/^u/, '').toUpperCase(),
      type_asset: 'sdk.coin',
      description: `Native token of ${chainName}`
    };
  };

  const createKeplrCurrency = (denom: string, chainData: Chain): KeplrCurrency | null => {
    // Create proper asset list structure
    const assetList = {
      chain_name: chainData.chain_name,
      assets: chainData.fees?.fee_tokens?.map(token => 
        createAssetFromFeeToken(token, chainData.chain_name)
      ) || []
    };

    const asset = getAssetByDenom([assetList], denom, chainData.chain_name);
    if (!asset) return null;

    // Create Keplr currency from the asset
    return {
      coinDenom: asset.symbol,
      coinMinimalDenom: asset.base,
      coinDecimals: asset.denom_units[1]?.exponent ?? 6,
      coinGeckoId: asset.coingecko_id
    };
  };

  const suggestChain = async () => {
    setError(null);
    try {
      if (!keplrWindow.keplr) {
        throw new Error('Keplr extension not found');
      }

      const rpcEndpoint = chain.chainData.apis?.rpc?.[0]?.address;
      const restEndpoint = chain.chainData.apis?.rest?.[0]?.address;
      const feeToken = chain.chainData.fees?.fee_tokens?.[0];

      if (!rpcEndpoint || !restEndpoint || !feeToken) {
        throw new Error('Required chain configuration missing');
      }

      const feeCurrency = createKeplrCurrency(feeToken.denom, chain.chainData);
      if (!feeCurrency) {
        throw new Error('Failed to create currency configuration');
      }

      const keplrChain: KeplrChainInfo = {
        chainId: chain.chainId,
        chainName: chain.chainName,
        rpc: rpcEndpoint,
        rest: restEndpoint,
        bip44: {
          coinType: chain.slip44,
        },
        bech32Config: {
          bech32PrefixAccAddr: chain.bech32Prefix,
          bech32PrefixAccPub: `${chain.bech32Prefix}pub`,
          bech32PrefixValAddr: `${chain.bech32Prefix}valoper`,
          bech32PrefixValPub: `${chain.bech32Prefix}valoperpub`,
          bech32PrefixConsAddr: `${chain.bech32Prefix}valcons`,
          bech32PrefixConsPub: `${chain.bech32Prefix}valconspub`,
        },
        currencies: [feeCurrency],
        feeCurrencies: [{
          ...feeCurrency,
          gasPriceStep: {
            low: feeToken.fixed_min_gas_price || 0.01,
            average: (feeToken.fixed_min_gas_price || 0.01) * 1.5,
            high: (feeToken.fixed_min_gas_price || 0.01) * 2,
          },
        }],
        stakeCurrency: feeCurrency,
      };

      await keplrWindow.keplr.experimentalSuggestChain(keplrChain);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to suggest chain';
      console.error('Chain suggestion failed:', error);
      setError(errorMessage);
    }
  };

  const connectWallet = async () => {
    setConnecting(true);
    setError(null);
    try {
      if (!keplrWindow.keplr) {
        throw new Error('Keplr extension not found');
      }

      await keplrWindow.keplr.enable(chain.chainId);
      const offlineSigner = keplrWindow.keplr.getOfflineSigner(chain.chainId);
      const accounts = await offlineSigner.getAccounts();
      
      if (!accounts[0]) {
        throw new Error('No accounts found');
      }
      
      onWalletSelect(accounts[0].address);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect wallet';
      console.error('Wallet connection failed:', error);
      setError(errorMessage);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <p className="text-sm">
        Connect your {chain.chainName} wallet to auto-fill receiving address
      </p>
      
      <div className="space-x-2">
        <button
          onClick={suggestChain}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={connecting}
        >
          Add to Keplr
        </button>
        
        <button
          onClick={connectWallet}
          disabled={connecting}
          className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            connecting
              ? 'bg-gray-300 cursor-not-allowed'
              : 'text-white bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {connecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default WalletSuggestion;