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

const pinataURL = process.env.NEXT_PUBLIC_PINATA_URL;

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
    const roundOneFinishAt = timestamp + 86400 * 3; // 3 days
    const roundTwoFinishAt = roundOneFinishAt + 86400 * 5; // 5 days

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

export type Token = {
  id: number;
  tokenUri: string;
  url: string;
};

export type TokenMetadata = {
  name: string;
  description: string;
  image: string;
  edition: number;
  date: number;
  attributes: { trait_type: string; value: string }[];
  compiler: string;
  imageUrl?: string;
  id?: number;
};

export async function getPastMints(
  signer: JsonRpcSigner
): Promise<TokenMetadata[] | undefined> {
  const contract = new Contract(CONTRACTS.nft, L2VE_NFT, signer);

  try {
    const baseURI = await contract.baseURI();
    const userAddress = await signer.getAddress();
    const startBlock = 13294754;
    const filter = contract.filters.Minted(userAddress, null, null); // Filter for user's mints
    const pastMints = await contract.queryFilter(filter, startBlock);

    let tokens: Token[] = [];
    pastMints.map((item: any) => {
      tokens.push({
        id: Number(item?.args[1]),
        tokenUri: item?.args[2],
        url: baseURI + item?.args[2],
      });
    });

    let tokensMetadata: TokenMetadata[] = [];

    for (let i = 0; i < tokens.length; i++) {
      const token: Token = tokens[i];
      const response = await fetch(pinataURL + "ipfs/" + token.url.slice(7));
      const metadata: TokenMetadata = await response.json();
      metadata.imageUrl = pinataURL + "ipfs/" + metadata.image.slice(7);
      metadata.id = token.id;
      tokensMetadata.push(metadata);
    }

    return tokensMetadata as TokenMetadata[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
