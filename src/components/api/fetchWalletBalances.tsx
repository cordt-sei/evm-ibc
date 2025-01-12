// src/components/api/fetchWalletBalances

import { API_BASE_URL } from "./config";

interface WalletBalance {
  denom: string;
  amount: string;
}

export async function fetchWalletBalances(address: string): Promise<WalletBalance[]> {
  const response = await fetch(`${API_BASE_URL}/cosmos/bank/v1beta1/balances/${address}`);
  const data: { balances: { denom: string; amount: string }[] } = await response.json();
  return data.balances.filter((balance) => balance.denom.startsWith("ibc/"));
}
