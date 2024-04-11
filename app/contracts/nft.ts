import {
  JsonRpcProvider,
  JsonRpcSigner,
  Contract,
  formatEther,
  parseEther,
} from "ethers";
import { L2VE_NFT } from "../utils/abis";
import { CONTRACTS } from "@/app/utils/consts";
import handleError from "../utils/handleErrors";
import NotificateTx from "../utils/notificateTx";

// export async function nftInfos(signer: JsonRpcSigner) {
//   const contract = new Contract(CONTRACTS.nft, L2VE_NFT, signer);

//   try {
//     const userAddress = await signer.getAddress();
//     const network = await signer.provider?.getNetwork();
//     const isPaused = await contract.paused();
//     const roundOneFinishAt = await contract.roundOneFinishAt();
//     const roundTwoFinishAt = await contract.roundTwoFinishAt();
//   } catch (error) {
//     handleError({ e: error as Error, notificate: true });
//   }
// }

export type WalletInfos = {
  isEligibleForRoundOne: boolean;
  isEligibleForRoundTwo: boolean;
  holderType: string;
};

export async function walletInfos(signer: JsonRpcSigner) {
  const contract = new Contract(CONTRACTS.nft, L2VE_NFT, signer);

  try {
    const userAddress = await signer.getAddress();
    const isL2VEHolder = await contract.isL2VEHolder(userAddress);
    const isCommunityHolder = await contract.isCommunityHolder(userAddress);
    const isEligibleForRoundOne = await contract.isEligibleForRoundOne(
      userAddress
    );
    const isEligibleForRoundTwo = await contract.isEligibleForRoundTwo(
      userAddress
    );

    const holderType = isL2VEHolder
      ? "L2VE"
      : isCommunityHolder
      ? "community"
      : undefined;

    return {
      isEligibleForRoundOne,
      isEligibleForRoundTwo,
      holderType,
    } as WalletInfos;
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}
