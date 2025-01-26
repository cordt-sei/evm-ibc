// src/utils/transaction.ts
import { BrowserProvider, Contract, JsonRpcSigner } from 'ethers';
import { IBC_PRECOMPILE } from '../contracts/ibcPrecompile';
import { CONFIG } from '../config/config';
import type { 
  TransferParams, 
  GasConfig, 
  IBCToken, 
  Height,
  TransactionStatus
} from '../types';

export const transaction = {
  calculateTimeoutTimestamp: (minutes: number = CONFIG.TIMEOUT_MINUTES): bigint => {
    return BigInt(Date.now() + minutes * 60 * 1000) * BigInt(1_000_000);
  },

  getTimeoutHeight: (currentHeight: number): number => {
    const blocksPerMinute = 60 / CONFIG.BLOCK_TIME_SECONDS;
    const timeoutBlocks = Math.ceil(blocksPerMinute * CONFIG.TIMEOUT_MINUTES);
    return currentHeight + timeoutBlocks;
  },

  constructTransferParams: (
    token: IBCToken,
    toAddress: string,
    amount: bigint,
    height: Height,
    memo: string = ''
  ): TransferParams => {
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
      timeoutTimestamp: transaction.calculateTimeoutTimestamp(),
      memo
    };
  },

  estimateGas: async (
    provider: BrowserProvider,
    params: TransferParams
  ): Promise<GasConfig> => {
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
  },

  executeTransfer: async (
    params: TransferParams,
    provider: BrowserProvider,
    gasConfig: Partial<GasConfig> & { signer?: JsonRpcSigner } = {}
  ) => {
    const signer = gasConfig.signer || await provider.getSigner();
    if (!signer) {
      throw new Error('Provider must be connected to a signer');
    }

    // Verify chain ID
    const network = await provider.getNetwork();
    if (network.chainId !== BigInt(CONFIG.EVM_CHAIN_ID)) {
      throw new Error(`Invalid network. Expected chain ID ${CONFIG.EVM_CHAIN_ID}, got ${network.chainId}`);
    }

    const contract = new Contract(
      CONFIG.IBC_PRECOMPILE,
      IBC_PRECOMPILE.abi,
      signer
    );

    const finalGasConfig = {
      ...gasConfig,
      gasLimit: gasConfig.gasLimit || await transaction.estimateGas(provider, params).then(g => g.gasLimit)
    };

    return contract.transfer(
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
  },

  monitorTransaction: async (
    provider: BrowserProvider,
    hash: string,
    maxAttempts: number = 10
  ): Promise<TransactionStatus> => {
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
        return {
          status: receipt?.status === 1 ? 'success' : 'error',
          hash,
          receipt
        };
      } catch (error) {
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return {
      status: 'error',
      hash,
      error: new Error('Transaction monitoring timeout')
    };
  },

  // Helper to validate transaction parameters
  validateTransactionParams: (params: TransferParams): boolean => {
    if (!params.toAddress || !params.channel || !params.denom) {
      return false;
    }
    if (params.amount <= 0n) {
      return false;
    }
    if (params.timeoutTimestamp <= 0n) {
      return false;
    }
    return true;
  }
};