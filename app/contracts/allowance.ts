import { ethers, formatEther } from "ethers";

export async function getAllowance(
  abi: any,
  owner: string,
  spender: string,
  signer: ethers.Signer
): Promise<bigint> {
  const signerAddress = await signer.getAddress();
  const contract = new ethers.Contract(owner, abi, signer);

  try {
    const allowance = await contract.allowance(signerAddress, spender);
    return allowance;
  } catch (e) {
    return BigInt(0);
  }
}
