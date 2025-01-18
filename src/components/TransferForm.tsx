import React, { useState } from 'react';
import TokenList from './TokenList';
import { constructIbcTxMsg } from './api/constructIbcTxMsg';
import { fetchIbcInfo } from './api/fetchIbcInfo';

type Token = {
  denom: string;
  channel: string;
  baseDenom: string;
  amount: string;
};

const TransferForm: React.FC = () => {
  const [receiver, setReceiver] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isValidAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address); // Example for EVM address validation
  };

  const validateForm = (): boolean => {
    if (!receiver || !amount || !selectedToken) {
      setError('Please fill out all fields and select a token.');
      return false;
    }

    if (!isValidAddress(receiver)) {
      setError('Please enter a valid receiver address.');
      return false;
    }

    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Please enter a valid amount greater than 0.');
      return false;
    }

    setError(null);
    return true;
  };

  const submitTransfer = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const timeoutTimestamp = (Date.now() + 10 * 60 * 1000) * 1_000_000; // 10 minutes in nanoseconds

      if (!selectedToken) {
        console.error('No token selected.');
        return;
      }

      // Fetch IBC info for timeout height
      const ibcInfo = await fetchIbcInfo(selectedToken.channel, 'transfer');
      const { revision_number, revision_height } = ibcInfo;

      // Construct the IBC transaction message
      const tx = await constructIbcTxMsg({
        sourcePort: 'transfer',
        sourceChannel: selectedToken.channel,
        token: { denom: selectedToken.denom, amount },
        sender: 'walletAddress',
        receiver,
        timeoutHeight: {
          revision_number,
          revision_height,
        },
        timeoutTimestamp,
        memo: '',
      });

      console.log('Constructed IBC Tx:', tx);
      alert('Transaction submitted successfully!');
    } catch (err) {
      console.error('Error submitting transaction:', err);
      setError('An error occurred while submitting the transaction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>IBC Transfer</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <TokenList setSelectedToken={setSelectedToken} />
      <input
        type="text"
        placeholder="Receiver Address"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={submitTransfer} disabled={loading}>
        {loading ? <span>Submitting...</span> : 'Submit Transfer'}
      </button>
    </div>
  );
};

export default TransferForm;
