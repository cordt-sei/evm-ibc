import React, { useState } from 'react';
import { constructIbcTxMsg } from './api/constructIbcTxMsg';
import { fetchIbcInfo } from './api/fetchIbcInfo';

type Token = {
  denom: string;
  channel: string;
  baseDenom: string;
  amount: string;
};

interface TransferFormProps {
  selectedToken: Token;
}

const TransferForm: React.FC<TransferFormProps> = ({ selectedToken }) => {
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitTransfer = async () => {
    if (!receiver || !amount) {
      setError('Please fill out all fields.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const timeoutTimestamp = (Date.now() + 10 * 60 * 1000) * 1_000_000;
      const ibcInfo = await fetchIbcInfo(selectedToken.channel, 'transfer');
      const { revision_number, revision_height } = ibcInfo;

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
      setError('Transaction failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Transfer Form</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
        {loading ? 'Submitting...' : 'Submit Transfer'}
      </button>
    </div>
  );
};

export default TransferForm;
