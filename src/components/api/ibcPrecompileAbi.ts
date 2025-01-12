export const IBC_PRECOMPILE_ADDRESS = "0x0000000000000000000000000000000000001009";

export const IBC_PRECOMPILE_ABI = [
  {
    inputs: [
      { internalType: "string", name: "toAddress", type: "string" },
      { internalType: "string", name: "port", type: "string" },
      { internalType: "string", name: "channel", type: "string" },
      { internalType: "string", name: "denom", type: "string" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint64", name: "revisionNumber", type: "uint64" },
      { internalType: "uint64", name: "revisionHeight", type: "uint64" },
      { internalType: "uint64", name: "timeoutTimestamp", type: "uint64" },
      { internalType: "string", name: "memo", type: "string" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "payable",
    type: "function",
  },
];
