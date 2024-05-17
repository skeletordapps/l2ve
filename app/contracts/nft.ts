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
  baseURI: string;
};

const pinataURL = process.env.NEXT_PUBLIC_PINATA_URL;

export async function nftInfos() {
  const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_HTTPS);
  const contract = new Contract(CONTRACTS.nft, L2VE_NFT, provider);

  try {
    const isPaused = await contract.paused();
    const startAt = Number(await contract.startAt());
    const roundOneFinishAt = Number(await contract.roundOneFinishAt());
    const roundTwoFinishAt = Number(await contract.roundTwoFinishAt());
    const currentRound = Number(await contract.currentRound()) + 1;
    const baseURI = await contract.baseURI();

    return {
      isPaused,
      startAt,
      roundOneFinishAt,
      roundTwoFinishAt,
      currentRound,
      baseURI,
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
    const roundTwoFinishAt = roundOneFinishAt + 86400 * 2; // 2 days

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
  signer: JsonRpcSigner,
  provider: JsonRpcProvider
): Promise<TokenMetadata[] | undefined> {
  const contract = new Contract(CONTRACTS.nft, L2VE_NFT, signer);

  try {
    const baseURI = await contract.baseURI();
    const userAddress = await signer.getAddress();
    const latestBlock = await provider.getBlockNumber();
    // console.log(latestBlock);

    const startBlock = 13345914;
    const filter = contract.filters.Minted(userAddress, null, null); // Filter for user's mints
    const pastMints = await contract.queryFilter(filter, startBlock, "latest");

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

export type NFTMetadata = {
  compiler: string;
  description: string;
  edition: number;
  image: string;
  name: string;
  symbol: string;
};

export type Nfts = {
  id: string;
  tokenId: string;
  tokenUri: string;
  wallet: string;
  src?: string;
  metadata?: NFTMetadata;
}[];

export async function getNFTData(ipfsUrl: string, tokenUri: string) {
  const gateway = process.env.NEXT_PUBLIC_IPFS_GATEWAY as string;

  const metadataUrl =
    gateway +
    "/ipfs/" +
    ipfsUrl.substring(ipfsUrl.indexOf("ipfs://") + 7, ipfsUrl.length) +
    tokenUri;
  const metadataResponse = await fetch(metadataUrl);
  const metadata: NFTMetadata = await metadataResponse.json();

  const imageUrl =
    gateway +
    "/ipfs/" +
    metadata.image.substring(
      metadata.image.indexOf("ipfs://") + 7,
      metadata.image.length
    );

  return { metadata, imageUrl };
}

export type NFT = {
  collection: string;
  contract: string;
  description: string;
  identifier: string;
  image_url: string;
  is_disabled: boolean;
  is_nsfw: boolean;
  metadata_url: string;
  name: string;
  opensea_url: string;
  token_standard: string;
  updated_at: string;
};

export async function getOpenseaData(signer: JsonRpcSigner) {
  try {
    const userAddress = await signer.getAddress();
    const network = await signer.provider?.getNetwork();

    const chainName = network.name.toLowerCase();
    const collection = "l2ve-nft";
    const apiKey = process.env.NEXT_PUBLIC_OPENSEA_API_KEY as string;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key": apiKey,
      },
    };

    const response = await fetch(
      `https://api.opensea.io/api/v2/chain/${chainName}/account/${userAddress}/nfts?collection=${collection}`,
      options
    );

    const json = await response.json();

    return json.nfts as NFT[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
