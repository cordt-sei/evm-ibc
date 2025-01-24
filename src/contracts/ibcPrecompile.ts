// src/contracts/ibcPrecompile.ts
import { Contract, JsonRpcProvider, TransactionResponse } from 'ethers';
import { 
  TransferParams, 
  GasConfig, 
  IBCToken,
  TransactionStatus,
  Height 
} from '../types';

/**
 * The IBC precompile interface on Sei chain.
 * This precompile allows EVM transactions to initiate IBC transfers.
 */
export const IBC_PRECOMPILE = {
  address: '0x0000000000000000000000000000001009',
  abi: [
    {
      inputs: [
        { internalType: 'string', name: 'toAddress', type: 'string' },
        { internalType: 'string', name: 'port', type: 'string' },
        { internalType: 'string', name: 'channel', type: 'string' },
        { internalType: 'string', name: 'denom', type: 'string' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
        { internalType: 'uint64', name: 'revisionNumber', type: 'uint64' },
        { internalType: 'uint64', name: 'revisionHeight', type: 'uint64' },
        { internalType: 'uint64', name: 'timeoutTimestamp', type: 'uint64' },
        { internalType: 'string', name: 'memo', type: 'string' }
      ],
      name: 'transfer',
      outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ]
} as const;

/**
 * Validates that a token is returnable to its source chain
 * @param token The IBC token to validate
 * @throws Error if token is not returnable
 */
function validateReturnableToken(token: IBCToken): void {
  if (!token.isReturnable) {
    throw new Error('Token is not returnable to its source chain');
  }
  if (!token.channel) {
    throw new Error('Token lacks channel information required for return');
  }
}

/**
 * Creates and returns an ethers Contract instance for the IBC precompile
 * @param provider JsonRpcProvider instance configured for Sei network
 */
export function getIbcPrecompileContract(provider: JsonRpcProvider): Contract {
  return new Contract(IBC_PRECOMPILE.address, IBC_PRECOMPILE.abi, provider);
}

/**
 * Estimates gas needed for an IBC transfer with safety buffer
 * @param contract The IBC precompile contract instance
 * @param params Transfer parameters
 * @returns Estimated gas limit with 20% buffer
 */
async function estimateTransferGas(
  contract: Contract,
  params: TransferParams
): Promise<bigint> {
  const estimate = await contract.transfer.estimateGas(
    params.toAddress,
    params.port,
    params.channel,
    params.denom,
    params.amount,
    params.revisionNumber,
    params.revisionHeight,
    params.timeoutTimestamp,
    params.memo
  );
  
  // Add 20% buffer to the estimate
  return (estimate * 120n) / 100n;
}

/**
 * Executes an IBC token return transfer via the precompile contract
 * 
 * @param params Transfer parameters including destination and amount
 * @param provider JsonRpcProvider instance connected to Sei
 * @param gasConfig Optional gas configuration
 * @returns TransactionResponse from the transfer
 * @throws Will throw if parameters are invalid or contract call fails
 */
export async function executeTransfer(
  params: TransferParams,
  provider: JsonRpcProvider,
  gasConfig: Partial<GasConfig> = {}
): Promise<TransactionResponse> {
  if (!provider.getSigner()) {
    throw new Error('Provider must be connected to a signer');
  }

  if (params.amount <= 0n) {
    throw new Error('Transfer amount must be greater than 0');
  }

  const contract = getIbcPrecompileContract(provider);

  try {
    // If no gas limit provided, estimate it
    const finalGasConfig: GasConfig = {
      ...gasConfig,
      gasLimit: gasConfig.gasLimit || await estimateTransferGas(contract, params)
    };

    const tx = await contract.transfer(
      params.toAddress,
      params.port,
      params.channel,
      params.denom,
      params.amount,
      BigInt(params.revisionNumber),
      BigInt(params.revisionHeight),
      params.timeoutTimestamp,
      params.memo,
      {
        ...finalGasConfig,
        type: 2 // EIP-1559 transaction type
      }
    );

    return tx;
  } catch (error) {
    if (error instanceof Error) {
      // Map common EVM errors to user-friendly messages
      if (error.message.includes('insufficient funds')) {
        throw new Error('Insufficient funds to execute transfer');
      }
      if (error.message.includes('gas required exceeds allowance')) {
        throw new Error('Transaction would exceed gas limit. Try increasing the gas limit.');
      }
      if (error.message.includes('nonce')) {
        throw new Error('Transaction nonce error. Please try again.');
      }
    }
    throw error;
  }
}

/**
 * Helper function to construct transfer parameters with proper timeout
 */
export function constructTransferParams(
  token: IBCToken,
  toAddress: string,
  amount: bigint,
  height: Height,
  memo: string = ''
): TransferParams {
  validateReturnableToken(token);
  
  // Set timeout 10 minutes in the future (in nanoseconds)
  const timeoutTimestamp = BigInt(Date.now() + 10 * 60 * 1000) * 1000000n;

  return {
    toAddress,
    port: 'transfer', // IBC transfer port is always 'transfer'
    channel: token.channel,
    denom: token.denom,
    amount,
    revisionNumber: parseInt(height.revision_number),
    revisionHeight: parseInt(height.revision_height),
    timeoutTimestamp,
    memo
  };
}