import { JsonRpcProvider, JsonRpcSigner, Contract, formatEther } from "ethers";

export async function balanceOf(
  abi: any,
  tokenAddress: string,
  userAddress: string
): Promise<string> {
  const BASE_RPC_URL = process.env.NEXT_PUBLIC_RPC_HTTPS as string;
  const provider = new JsonRpcProvider(BASE_RPC_URL);
  const contract = new Contract(tokenAddress, abi, provider);

  // Get the balance of the user
  const balance: string = await contract.balanceOf(userAddress);
  return balance;
}

export async function getEtherBalance(userAddress: string): Promise<string> {
  const BASE_RPC_URL = process.env.NEXT_PUBLIC_RPC_HTTPS as string;
  const provider = new JsonRpcProvider(BASE_RPC_URL);
  const balance = await provider.getBalance(userAddress);

  // Convert wei balance to a human-readable format (optional)
  return formatEther(balance);
}
