import { SetStateAction, useState } from 'react';
import WalletConnect from './WalletConnect';
import TokenList, { Token } from './TokenList';
import TransferForm from './TransferForm';
import { useDynamicContext, useUserWallets, useTokenBalances } from '@dynamic-labs/sdk-react-core';

const WalletList = () => {
  const userWallets = useUserWallets();

  if (userWallets.length === 0) {
    return <p>No wallets connected</p>;
  }

  return (
    <div>
      <h2>Connected Wallets:</h2>
      <ul>
        {userWallets.map((wallet) => (
          <li key={wallet.id}>{wallet.address}</li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const { primaryWallet } = useDynamicContext();
  
  const walletAddress = primaryWallet?.address;

  return (
    <div>
      <h1>IBC Transfer UI</h1>
      <p>Connected Wallet: {primaryWallet ? primaryWallet.address : 'No wallet connected'}</p>
      <WalletConnect />
      <TokenList setSelectedToken={function (value: SetStateAction<Token | null>): void {
        throw new Error('Function not implemented.');
      } } />
      <TransferForm />
    </div>
  );
};

export default App;
