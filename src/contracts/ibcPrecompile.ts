// src/contracts/ibcPrecompile.ts
import { Contract, JsonRpcProvider, TransactionResponse } from 'ethers';
import { CONFIG } from '../config/config';
import { 
  TransferParams, 
  GasConfig, 
  IBCToken,
  Height 
} from '../types';

export class IBCTransferError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'IBCTransferError';
  }
}

export const IBC_PRECOMPILE = {
  address: CONFIG.IBC_PRECOMPILE,
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

export function calculateTimeoutTimestamp(minutes: number = CONFIG.TIMEOUT_MINUTES): bigint {
  return BigInt(Date.now() + minutes * 60 * 1000) * BigInt(1_000_000);
}

export function constructTransferParams(
  token: IBCToken,
  toAddress: string,
  amount: bigint,
  height: Height,
  memo: string = ''
): TransferParams {
  if (!token.isReturnable) {
    throw new IBCTransferError('Token is not returnable to its source chain');
  }

  return {
    toAddress,
    port: 'transfer',
    channel: token.channel,
    denom: token.denom,
    amount,
    revisionNumber: parseInt(height.revision_number),
    revisionHeight: parseInt(height.revision_height),
    timeoutTimestamp: calculateTimeoutTimestamp(),
    memo
  };
}

export async function estimateGas(
  provider: JsonRpcProvider,
  params: TransferParams
): Promise<GasConfig> {
  try {
    const contract = new Contract(
      CONFIG.IBC_PRECOMPILE,
      IBC_PRECOMPILE.abi,
      provider
    );

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

    // Add 20% buffer to estimate
    const gasLimit = (estimate * BigInt(120)) / BigInt(100);
    return { gasLimit };
  } catch (error) {
    console.warn('Gas estimation failed, using default:', error);
    return { gasLimit: CONFIG.DEFAULT_GAS_LIMIT };
  }
}

export async function executeTransfer(
  params: TransferParams,
  provider: JsonRpcProvider,
  gasConfig: Partial<GasConfig> = {}
): Promise<TransactionResponse> {
  const signer = provider.getSigner();
  if (!signer) {
    throw new IBCTransferError('Provider must be connected to a signer');
  }

  // Verify network
  const network = await provider.getNetwork();
  if (network.chainId !== BigInt(CONFIG.EVM_CHAIN_ID)) {
    throw new IBCTransferError(
      `Wrong network. Expected chain ID ${CONFIG.EVM_CHAIN_ID}, got ${network.chainId}`
    );
  }

  const contract = new Contract(
    CONFIG.IBC_PRECOMPILE,
    IBC_PRECOMPILE.abi,
    signer
  );

  try {
    const finalGasConfig = {
      ...gasConfig,
      gasLimit: gasConfig.gasLimit || CONFIG.DEFAULT_GAS_LIMIT
    };

    return await contract.transfer(
      params.toAddress,
      params.port,
      params.channel,
      params.denom,
      params.amount,
      BigInt(params.revisionNumber),
      BigInt(params.revisionHeight),
      params.timeoutTimestamp,
      params.memo,
      finalGasConfig
    );
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('insufficient funds')) {
        throw new IBCTransferError('Insufficient funds for transfer');
      }
      if (error.message.includes('gas required exceeds allowance')) {
        throw new IBCTransferError('Transaction would exceed gas limit');
      }
    }
    throw error;
  }
}