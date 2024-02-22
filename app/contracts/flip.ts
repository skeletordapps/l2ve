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
  owner: string;
};

export type Balances = {
  balance: number;
  rewards: number;
  tickets: number;
  accumulatedLosses: number;
  contractBalance: number;
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
  const accumulatedLosses = Number(
    formatEther(await contract.accumulatedLosses())
  );

  const contractBalanceInL2VE = await balanceOf(
    L2VE_ABI,
    CONTRACTS.l2ve,
    CONTRACTS.flipCoin,
    undefined,
    signer
  );

  const contractBalance = Number(formatEther(contractBalanceInL2VE));

  return {
    balance,
    rewards,
    tickets,
    accumulatedLosses,
    contractBalance,
  } as Balances;
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
  console.log("toggle pause");
  const contract = new Contract(CONTRACTS.flipCoin, L2VE_FLIP_COIN_ABI, signer);

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

export async function withdrawLosses(signer: JsonRpcSigner) {
  console.log("withdraw losses");
  const contract = new Contract(CONTRACTS.flipCoin, L2VE_FLIP_COIN_ABI, signer);

  try {
    const userAddress = await signer.getAddress();
    const network = await signer.provider?.getNetwork();
    const owner = await contract.owner();
    const isPaused = await contract.paused();

    if (userAddress === owner) {
      const tx = await contract.withdrawLosses();
      await NotificateTx(network, tx);
    }
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

export async function withdraw(signer: JsonRpcSigner) {
  console.log("withdraw");
  const contract = new Contract(CONTRACTS.flipCoin, L2VE_FLIP_COIN_ABI, signer);

  try {
    const userAddress = await signer.getAddress();
    const network = await signer.provider?.getNetwork();
    const owner = await contract.owner();
    const isPaused = await contract.paused();

    if (userAddress === owner) {
      const tx = await contract.withdraw();
      await NotificateTx(network, tx);
    }
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

export async function getInfos(
  provider: JsonRpcProvider,
  signer?: JsonRpcSigner
) {
  const contract = new Contract(
    CONTRACTS.flipCoin,
    L2VE_FLIP_COIN_ABI,
    signer ? signer : provider
  );

  try {
    const paused = await contract.paused();
    const price = Number(formatEther(await contract.price()));
    const owner = await contract.owner();

    return { paused, price, owner } as FlipInfos;
  } catch (error) {
    handleError({ e: error as Error, notificate: false });
    return { paused: true, price: 0 } as FlipInfos;
  }
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
    return null;
  }
}

export async function claim(signer: JsonRpcSigner) {
  const contract = new Contract(CONTRACTS.flipCoin, L2VE_FLIP_COIN_ABI, signer);

  try {
    const userAddress = await signer.getAddress();
    const network = await signer.provider?.getNetwork();
    const tx = await contract.claim(userAddress);
    await NotificateTx(network, tx);
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

export async function convertIntickets(signer: JsonRpcSigner) {
  const contract = new Contract(CONTRACTS.flipCoin, L2VE_FLIP_COIN_ABI, signer);

  try {
    const userAddress = await signer.getAddress();
    const network = await signer.provider?.getNetwork();
    const tx = await contract.convertInTickets(userAddress);
    await NotificateTx(network, tx);
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}
