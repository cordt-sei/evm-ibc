import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

const WalletConnect = () => {
  const { user, setShowAuthFlow } = useDynamicContext();

  const connectWallet = () => {
    setShowAuthFlow(true); // Open Dynamic's wallet connection modal
  };

  return (
    <div>
      {user ? (
        <p>Connected: {user?.email || 'Wallet Connected'}</p> // Check the properties available in 'user'
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnect;
