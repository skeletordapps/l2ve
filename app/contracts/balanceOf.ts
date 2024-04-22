import { JsonRpcProvider, JsonRpcSigner, Contract, formatEther } from "ethers";

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

export async function getEtherBalance(
  userAddress: string,
  signer: JsonRpcSigner
): Promise<string> {
  const balance = await signer.provider.getBalance(userAddress);

  // Convert wei balance to a human-readable format (optional)
  return formatEther(balance);
}
