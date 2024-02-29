import { ethers } from "ethers";
import { EXPLORER_LINKS } from "@/app/utils/consts";
import Notificate from "@/app/components/notificate";
import handleError from "@/app/utils/handleErrors";

export async function approve(
  abi: any,
  contractAddress: string,
  spender: string,
  signer: ethers.Signer,
  amount: bigint,
  
) {
  try {
    const network = await signer.provider?.getNetwork();
    const contract = new ethers.Contract(
      contractAddress as string,
      abi,
      signer
    );

    const tx = await contract.approve(spender, amount);
    const txUrl =
      EXPLORER_LINKS[network!.chainId.toString()] + tx.hash.toString();

    Notificate({
      type: "",
      title: "Transaction Submitted",
      message: "Your approval transaction was successfully submitted.",
      link: txUrl,
    });

    const receipt = await tx.wait();
    Notificate({
      type: "success",
      title: "Transaction Confirmed",
      message: `Approval confirmed in block ${receipt.blockNumber}`,
      link: txUrl,
    });

    return receipt;
  } catch (e) {
    return handleError({ e: e as Error, notificate: true });
  }
}
