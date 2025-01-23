// src/utils/gasEstimation.ts
import { Contract } from 'ethers';
import { TransferParams, GasConfig } from '../types';

export async function estimateGasForTransfer(
  contract: Contract,
  params: TransferParams
): Promise<GasConfig> {
  try {
    const estimate = await contract.transfer.estimateGas(
      params.toAddress,
      params.port,
      params.channel,
      params.denom,
      params.amount,
      params.revisionNumber,
      params.revisionHeight,
      params.timeoutTimestamp,
      params.memo,
      { value: params.denom === 'usei' ? params.amount : 0n }
    );
    
    const gasLimit = estimate * BigInt(120) / BigInt(100);
    return { gasLimit };
  } catch {
    return { gasLimit: BigInt(2000000) };
  }
}