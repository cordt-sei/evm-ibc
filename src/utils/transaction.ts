// src/utils/transaction.ts
import { JsonRpcProvider, Contract } from 'ethers';
import type { TransferParams, GasConfig, IBCToken, Height } from '../types';
import { IBC_PRECOMPILE } from '../contracts/ibcPrecompile';

export function calculateTimeoutTimestamp(minutes: number = 10): bigint {
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
    throw new Error('Token is not returnable to its source chain');
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

export async function estimateGasWithBuffer(
  provider: JsonRpcProvider,
  params: TransferParams
): Promise<GasConfig> {
  try {
    const contract = new Contract(
      IBC_PRECOMPILE.address,
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

    const gasLimit = (estimate * BigInt(120)) / BigInt(100); // Add 20% buffer
    return { gasLimit };
  } catch (error) {
    // Default gas limit if estimation fails
    return { gasLimit: BigInt(2000000) };
  }
}

export async function checkTransactionStatus(
  provider: JsonRpcProvider,
  hash: string,
  maxAttempts: number = 10
): Promise<boolean> {
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    try {
      const tx = await provider.getTransaction(hash);
      if (!tx) {
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 1000));
        continue;
      }
      
      const receipt = await tx.wait();
      return receipt?.status === 1;
    } catch (error) {
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return false;
}