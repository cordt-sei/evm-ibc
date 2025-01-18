import { useState } from 'react';
import WalletConnect from './WalletConnect';
import TokenList from './TokenList';
import TransferForm from './TransferForm';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

type Token = {
  denom: string;
  channel: string;
  baseDenom: string;
  amount: string;
};

const App = () => {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const { primaryWallet } = useDynamicContext();
  const walletAddress = primaryWallet?.address;

  return (
    <div>
      <h1>IBC Transfer UI</h1>
      <p>Connected Wallet: {walletAddress || 'No wallet connected'}</p>
      <WalletConnect />
      <TokenList setSelectedToken={setSelectedToken} />
      <TransferForm />
    </div>
  );
};

export default App;
