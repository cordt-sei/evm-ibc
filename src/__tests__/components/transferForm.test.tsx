// __tests__/components/TransferForm.test.tsx
import { render, fireEvent, waitFor } from '@testing-library/react';
import TransferForm from '../../components/TransferForm';
import { executeTransfer } from '../../contracts/ibcPrecompile';

jest.mock('../../contracts/ibcPrecompile');

const mockToken = {
 denom: 'ibc/123',
 channel: 'channel-0',
 trace: {
   path: 'transfer/channel-0',
   base_denom: 'uatom'
 },
 balance: '1000000',
 isReturnable: true
};

describe('TransferForm', () => {
 beforeEach(() => {
   jest.clearAllMocks();
 });

 it('validates receiver address', async () => {
   const { getByPlaceholderText, getByText } = render(
     <TransferForm selectedToken={mockToken} walletAddress="0x123" />
   );

   const input = getByPlaceholderText('cosmos... address');
   fireEvent.change(input, { target: { value: 'invalid' } });

   expect(getByText('Invalid address format')).toBeInTheDocument();
 });

 it('executes transfer successfully', async () => {
   (executeTransfer as jest.Mock).mockResolvedValue({
     hash: '0x123',
     wait: () => Promise.resolve({ status: 1 })
   });

   const { getByPlaceholderText, getByText } = render(
     <TransferForm selectedToken={mockToken} walletAddress="0x123" />
   );

   fireEvent.change(getByPlaceholderText('cosmos... address'), {
     target: { value: 'cosmos1xyz' }
   });
   fireEvent.change(getByPlaceholderText('Amount'), {
     target: { value: '1' }
   });
   fireEvent.click(getByText('Return Token'));

   await waitFor(() => {
     expect(executeTransfer).toHaveBeenCalled();
   });
 });
});