// src/contracts/ibcPrecompile.ts
import { Contract, JsonRpcProvider } from 'ethers';
import { TransferParams } from '../types';

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
       { internalType: 'string', name: 'memo', type: 'string' },
     ],
     name: 'transfer',
     outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }],
     stateMutability: 'payable',
     type: 'function',
   }
 ]
} as const;

export function getIbcPrecompileContract(provider: JsonRpcProvider) {
 return new Contract(IBC_PRECOMPILE.address, IBC_PRECOMPILE.abi, provider);
}

export async function executeTransfer(
 params: TransferParams,
 provider: JsonRpcProvider,
 gasConfig: GasConfig
) {
 const contract = getIbcPrecompileContract(provider);
 
 const tx = await contract.transfer(
   params.toAddress,
   params.port,
   params.channel,
   params.denom,
   params.amount,
   params.revisionNumber,
   params.revisionHeight,
   params.timeoutTimestamp,
   params.memo,
   {
     value: params.denom === 'usei' ? params.amount : 0n,
     ...gasConfig,
     type: 2
   }
 );

 return tx;
}