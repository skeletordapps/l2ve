import {
  Contract,
  JsonRpcProvider,
  JsonRpcSigner,
  Signer,
  formatEther,
  formatUnits,
  parseEther,
  parseUnits,
} from "ethers";
import { CONTRACTS } from "../utils/consts";
import { ERC20_ABI, L2VE_ABI, SWAPPER } from "../utils/abis";
import NotificateTx from "../utils/notificateTx";
import handleError from "../utils/handleErrors";
import { getAllowance } from "./allowance";
import { approve } from "./approve";
import { balanceOf } from "./balanceOf";

const BASE_RPC_URL = process.env.NEXT_PUBLIC_RPC_HTTPS as string;
// const TEST_RPC = "http://127.0.0.1:8545";

async function getContract(signer?: JsonRpcSigner) {
  try {
    const provider = new JsonRpcProvider(BASE_RPC_URL);
    const contractAddress = CONTRACTS.swapper;
    const contract = new Contract(contractAddress, SWAPPER, signer || provider);

    return contract;
  } catch (e) {
    handleError({ e: e, notificate: true });
  }
}

export async function handleApproval(amount: string, signer: Signer) {
  try {
    await approve(
      ERC20_ABI,
      CONTRACTS.l2ve,
      CONTRACTS.swapper,
      signer,
      parseEther(amount)
    );
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

export async function generalInfo() {
  try {
    const aeroBalance = Number(
      formatEther(await balanceOf(L2VE_ABI, CONTRACTS.aero, CONTRACTS.swapper))
    );

    const contract = await getContract();
    const isPaused: boolean = await contract?.paused();

    return { aeroBalance, isPaused };
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

export async function userInfo(account: string) {
  try {
    const balance = Number(
      formatEther(await balanceOf(L2VE_ABI, CONTRACTS.l2ve, account))
    );

    const allowance = Number(
      formatEther(
        await getAllowance(
          ERC20_ABI,
          CONTRACTS.l2ve,
          CONTRACTS.swapper,
          account
        )
      )
    );

    return { balance, allowance };
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

export async function swap(amount: string, signer: JsonRpcSigner) {
  try {
    const contract = await getContract(signer);
    const network = await signer.provider?.getNetwork();
    const tx = await contract?.swap(parseEther(amount));
    await NotificateTx(network, tx);
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

export async function withdraw(signer: JsonRpcSigner) {
  try {
    const contract = await getContract(signer);
    const network = await signer.provider?.getNetwork();
    const tx = await contract?.withdraw();
    await NotificateTx(network, tx);
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

export async function emergencyWithdraw(signer: JsonRpcSigner) {
  const contract = await getContract(signer);
  try {
    const network = await signer.provider?.getNetwork();
    const tx = await contract?.emergencyWithdraw();
    await NotificateTx(network, tx);
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}
