import { JsonRpcProvider, JsonRpcSigner, Contract } from "ethers";
import { L2VE_NFT, L2VE_PUBLIC_NFT } from "../utils/abis";
import { CONTRACTS } from "@/app/utils/consts";
import handleError from "../utils/handleErrors";
import NotificateTx from "../utils/notificateTx";
import { now } from "../utils/time";
import { NFT } from "./nft";

export type PublicNftInfos = {
  isPaused: boolean;
  startAt: number;
  roundOneFinishAt: number;
  roundTwoFinishAt: number;
  currentRound: number;
  baseURI: string;
};

export async function nftInfos(provider: JsonRpcProvider) {
  const contract = new Contract(CONTRACTS.publicNft, L2VE_PUBLIC_NFT, provider);

  try {
    const isPaused = await contract.paused();
    const startAt = Number(await contract.startAt());
    const baseURI = await contract.baseURI();

    return {
      isPaused,
      startAt,
      baseURI,
    } as PublicNftInfos;
  } catch (error) {
    handleError({ e: error as Error, notificate: false });
  }
}

export async function togglePause(signer: JsonRpcSigner) {
  const contract = new Contract(CONTRACTS.publicNft, L2VE_PUBLIC_NFT, signer);

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
  const contract = new Contract(CONTRACTS.publicNft, L2VE_PUBLIC_NFT, signer);

  try {
    const userAddress = await signer.getAddress();
    const network = await signer.provider?.getNetwork();
    const owner = await contract.owner();

    const timestamp = now();
    const startAt = timestamp;

    if (userAddress === owner) {
      const tx = await contract.initialize(startAt);
      await NotificateTx(network, tx);
    }
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

export type PublicWalletInfos = {
  isOwner: boolean;
  mintedsCount: number;
};

export async function walletInfos(signer: JsonRpcSigner) {
  const contract = new Contract(CONTRACTS.publicNft, L2VE_PUBLIC_NFT, signer);

  try {
    const userAddress = await signer.getAddress();

    const owner = await contract.owner();
    const isOwner = userAddress === owner;
    const mintedsCount = Number(await contract.tokens(userAddress));

    return {
      isOwner,
      mintedsCount,
    } as PublicWalletInfos;
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

export async function mint(signer: JsonRpcSigner) {
  const contract = new Contract(CONTRACTS.publicNft, L2VE_PUBLIC_NFT, signer);

  try {
    const userAddress = await signer.getAddress();
    const network = await signer.provider?.getNetwork();

    const tx = await contract.mint(userAddress);
    await NotificateTx(network, tx);
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

export async function getOpenseaDataForPublic(signer: JsonRpcSigner) {
  try {
    const userAddress = await signer.getAddress();
    const network = await signer.provider?.getNetwork();

    const chainName = network.name.toLowerCase();
    const collection = "l2ve-nft-public";
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
