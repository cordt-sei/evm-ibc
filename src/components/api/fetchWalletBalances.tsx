// src/components/api/fetchWalletBalances

interface WalletBalance {
  denom: string;
  amount: string;
}

export async function fetchWalletBalances(address: string): Promise<WalletBalance[]> {
  const response = await fetch(`https://api.sei.basementnodes.ca/cosmos/bank/v1beta1/balances/${address}`);
  const data: { balances: { denom: string; amount: string }[] } = await response.json();
  return data.balances.filter((balance) => balance.denom.startsWith("ibc/"));
}