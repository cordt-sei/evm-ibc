// src/components/WalletSuggestion.tsx
import React, { useState } from 'react';
import { ChainInfo } from '../types';

interface WalletSuggestionProps {
 chain: ChainInfo;
 onWalletSelect: (address: string) => void;
}

const WalletSuggestion: React.FC<WalletSuggestionProps> = ({ chain, onWalletSelect }) => {
 const [connecting, setConnecting] = useState(false);

 const suggestChain = async () => {
   try {
     await window.keplr?.experimentalSuggestChain({
       chainId: chain.chainId,
       chainName: chain.chainName,
       rpc: chain.chainData.apis?.rpc?.[0]?.address || '',
       rest: chain.chainData.apis?.rest?.[0]?.address || '',
       bip44: { coinType: chain.slip44 },
       bech32Config: {
         bech32PrefixAccAddr: chain.bech32Prefix,
         bech32PrefixAccPub: `${chain.bech32Prefix}pub`,
         bech32PrefixValAddr: `${chain.bech32Prefix}valoper`,
         bech32PrefixValPub: `${chain.bech32Prefix}valoperpub`,
         bech32PrefixConsAddr: `${chain.bech32Prefix}valcons`,
         bech32PrefixConsPub: `${chain.bech32Prefix}valconspub`,
       },
       currencies: chain.chainData.currencies,
       feeCurrencies: chain.chainData.fees.fee_tokens,
       stakeCurrency: chain.chainData.staking?.staking_tokens[0],
       gasPriceStep: chain.chainData.fees.fee_tokens[0].fixed_min_gas_price || 0.025,
     });
   } catch (error) {
     console.error('Failed to suggest chain:', error);
   }
 };

 const connectWallet = async () => {
   setConnecting(true);
   try {
     if (window.keplr) {
       await window.keplr.enable(chain.chainId);
       const offlineSigner = window.keplr.getOfflineSigner(chain.chainId);
       const accounts = await offlineSigner.getAccounts();
       if (accounts[0]) onWalletSelect(accounts[0].address);
     }
   } catch (error) {
     console.error('Failed to connect wallet:', error);
   } finally {
     setConnecting(false);
   }
 };

 return (
   <div>
     <p>Connect your {chain.chainName} wallet to auto-fill receiving address</p>
     <button onClick={suggestChain}>Add to Keplr</button>
     <button onClick={connectWallet} disabled={connecting}>
       {connecting ? 'Connecting...' : 'Connect Wallet'}
     </button>
   </div>
 );
};

export default WalletSuggestion;