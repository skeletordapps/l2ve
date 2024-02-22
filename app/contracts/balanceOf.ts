import { JsonRpcProvider, JsonRpcSigner, Contract } from "ethers";

export async function balanceOf(
  abi: any,
  tokenAddress: string,
  userAddress: string,
  provider?: JsonRpcProvider,
  signer?: JsonRpcSigner
): Promise<string> {
  const contract = new Contract(
    tokenAddress,
    abi,
    provider ? provider : signer
  );

  // Get the balance of the user
  const balance: string = await contract.balanceOf(userAddress);
  return balance;
}
