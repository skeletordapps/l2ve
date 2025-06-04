import { ethers, JsonRpcProvider } from "ethers";

export async function getAllowance(
  abi: any,
  token: string,
  spender: string,
  account: string
): Promise<bigint> {
  const BASE_RPC_URL = process.env.NEXT_PUBLIC_RPC_HTTPS as string;
  const provider = new JsonRpcProvider(BASE_RPC_URL);
  const contract = new ethers.Contract(token, abi, provider);

  try {
    const allowance = await contract.allowance(account, spender);
    return allowance;
  } catch (e) {
    return BigInt(0);
  }
}
