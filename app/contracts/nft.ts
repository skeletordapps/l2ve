import { JsonRpcProvider, JsonRpcSigner, Contract } from "ethers";
import { L2VE_NFT } from "../utils/abis";
import { CONTRACTS } from "@/app/utils/consts";
import handleError from "../utils/handleErrors";
import NotificateTx from "../utils/notificateTx";
import { now } from "../utils/time";

export type NftInfos = {
  isPaused: boolean;
  startAt: number;
  roundOneFinishAt: number;
  roundTwoFinishAt: number;
  currentRound: number;
};

export async function nftInfos(provider: JsonRpcProvider) {
  const contract = new Contract(CONTRACTS.nft, L2VE_NFT, provider);

  try {
    const isPaused = await contract.paused();
    const startAt = Number(await contract.startAt());
    const roundOneFinishAt = Number(await contract.roundOneFinishAt());
    const roundTwoFinishAt = Number(await contract.roundTwoFinishAt());
    const currentRound = Number(await contract.currentRound()) + 1;

    return {
      isPaused,
      startAt,
      roundOneFinishAt,
      roundTwoFinishAt,
      currentRound,
    } as NftInfos;
  } catch (error) {
    handleError({ e: error as Error, notificate: false });
  }
}

export async function togglePause(signer: JsonRpcSigner) {
  const contract = new Contract(CONTRACTS.nft, L2VE_NFT, signer);

  try {
    const userAddress = await signer.getAddress();
    const network = await signer.provider?.getNetwork();
    const owner = await contract.owner();
    const isPaused = await contract.paused();

    if (userAddress === owner) {
      const tx = isPaused ? await contract.unpause() : await contract.pause();
      await NotificateTx(network, tx);
    }
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

export async function initialize(signer: JsonRpcSigner) {
  const contract = new Contract(CONTRACTS.nft, L2VE_NFT, signer);

  try {
    const userAddress = await signer.getAddress();
    const network = await signer.provider?.getNetwork();
    const owner = await contract.owner();

    const timestamp = now();
    const startAt = timestamp;
    // const roundOneFinishAt = timestamp + 86400 * 3; // 3 days
    // const roundTwoFinishAt = roundOneFinishAt + 86400 * 5; // 5 days
    const roundOneFinishAt = timestamp + 3600; // 1 hour
    const roundTwoFinishAt = roundOneFinishAt + 3600 * 3; // 3 hours

    if (userAddress === owner) {
      const tx = await contract.initialize(
        startAt,
        roundOneFinishAt,
        roundTwoFinishAt
      );
      await NotificateTx(network, tx);
    }
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

export type WalletInfos = {
  isEligibleForRoundOne: boolean;
  isEligibleForRoundTwo: boolean;
  holderType: string;
  isOwner: boolean;
  mintedsCount: number;
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

    const owner = await contract.owner();
    const isOwner = userAddress === owner;
    const mintedsCount = Number(await contract.tokens(userAddress));

    return {
      isEligibleForRoundOne,
      isEligibleForRoundTwo,
      holderType,
      isOwner,
      mintedsCount,
    } as WalletInfos;
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

export async function mint(signer: JsonRpcSigner) {
  const contract = new Contract(CONTRACTS.nft, L2VE_NFT, signer);

  try {
    const userAddress = await signer.getAddress();
    const network = await signer.provider?.getNetwork();

    const tx = await contract.mint(userAddress);
    await NotificateTx(network, tx);
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

// export async function listenMints(signer: JsonRpcSigner) {
//   const contract = new Contract(CONTRACTS.nft, L2VE_NFT, signer);
//   // event Minted(address indexed wallet, uint256 tokenId, string tokenUri);
//   contract.on("Minted", (wallet: string, tokenId: string, tokenUri: string) => {
//     // Handle the event with arguments (arg1, arg2, ...)
//     console.log("Event triggered!", wallet, tokenId, tokenUri);
//     // Update your component state or perform actions based on the event data
//   });
// }
