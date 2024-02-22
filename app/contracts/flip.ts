import {
  JsonRpcProvider,
  JsonRpcSigner,
  Contract,
  formatEther,
  parseEther,
} from "ethers";
import { L2VE_ABI, L2VE_FLIP_COIN_ABI } from "../utils/abis";
import { CONTRACTS, EXPLORER_LINKS } from "@/app/utils/consts";
import handleError from "../utils/handleErrors";
import { balanceOf } from "./balanceOf";
import { getAllowance } from "./allowance";
import { approve } from "./approve";
import NotificateTx from "../utils/notificateTx";

export type FlipInfos = {
  paused: boolean;
  price: number;
};

export type Balances = {
  balance: number;
  rewards: number;
  tickets: number;
};

export async function getBalances(signer: JsonRpcSigner) {
  const userAddress = await signer.getAddress();
  const balanceInL2VE = await balanceOf(
    L2VE_ABI,
    CONTRACTS.l2ve,
    userAddress,
    undefined,
    signer
  );

  const balance = Number(formatEther(balanceInL2VE));

  const contract = new Contract(CONTRACTS.flipCoin, L2VE_FLIP_COIN_ABI, signer);
  const rewards = Number(formatEther(await contract.rewards(userAddress)));
  const tickets = Number(await contract.tickets(userAddress));

  return { balance, rewards, tickets } as Balances;
}

export async function hasAllowance(
  amount: string,
  signer: JsonRpcSigner
): Promise<boolean> {
  const allowance = await getAllowance(
    L2VE_ABI,
    CONTRACTS.l2ve,
    CONTRACTS.flipCoin,
    signer
  );

  return allowance >= parseEther(amount);
}

export async function handleApproval(
  amount: string,
  signer: JsonRpcSigner
): Promise<boolean> {
  try {
    const approved = await approve(
      L2VE_ABI,
      CONTRACTS.l2ve,
      CONTRACTS.flipCoin,
      signer,
      parseEther(amount)
    );

    return approved;
  } catch (e) {
    handleError({ e, notificate: true });
    return false;
  }
}

export async function togglePause(signer: JsonRpcSigner) {
  const contract = new Contract(CONTRACTS.flipCoin, L2VE_FLIP_COIN_ABI, signer);

  try {
    const userAddress = await signer.getAddress();
    const network = await signer.provider?.getNetwork();
    const owner = await contract.owner();
    const isPaused = await contract.paused();

    if (userAddress === owner && isPaused) {
      const tx = await contract.unpause();
      await NotificateTx(network, tx);
    }
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

export async function getInfos(
  provider?: JsonRpcProvider,
  signer?: JsonRpcSigner
) {
  const contract = new Contract(
    CONTRACTS.flipCoin,
    L2VE_FLIP_COIN_ABI,
    signer ? signer : provider
  );

  const paused = await contract.paused();
  const price = Number(formatEther(await contract.price()));

  return { paused, price } as FlipInfos;
}

export async function buy(numOfTickets: number, signer: JsonRpcSigner) {
  const contract = new Contract(CONTRACTS.flipCoin, L2VE_FLIP_COIN_ABI, signer);

  try {
    const userAddress = await signer.getAddress();
    const network = await signer.provider?.getNetwork();
    const tx = await contract.buy(userAddress, numOfTickets);

    await NotificateTx(network, tx);
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

export async function play(
  choice: boolean,
  bets: number,
  signer: JsonRpcSigner
) {
  const contract = new Contract(CONTRACTS.flipCoin, L2VE_FLIP_COIN_ABI, signer);

  try {
    const userAddress = await signer.getAddress();
    const network = await signer.provider?.getNetwork();
    const tx = await contract.play(userAddress, choice, bets);
    await NotificateTx(network, tx);

    const receipt = await tx.wait();
    const isWinner = receipt.logs[0].args[2];

    return isWinner;
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}
