import { Contract, JsonRpcSigner, formatEther } from "ethers";
import { balanceOf, getEtherBalance } from "./balanceOf";
import { L2VE_ABI } from "../utils/abis";
import handleError from "../utils/handleErrors";

export enum SendType {
  ether = "ether",
  token = "token",
}

export async function checkBalance(
  signer: JsonRpcSigner,
  type: SendType,
  token?: string
) {
  try {
    const userAddress = await signer.getAddress();

    if (type === SendType.ether) {
      const etherBalance = Number(await getEtherBalance(userAddress, signer));
      return etherBalance;
    } else if (type === SendType.token && token) {
      const tokenBalance = await balanceOf(
        L2VE_ABI,
        token,
        userAddress,
        undefined,
        signer
      );

      return Number(formatEther(tokenBalance));
    }
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

export type TokenInfos = {
  symbol: string;
  decimals: number;
  balance: number;
  valid: boolean;
};

export async function tokenIsValid(signer: JsonRpcSigner, token: string) {
  const invalid = {
    symbol: "",
    decimals: 0,
    balance: 0,
    valid: false,
  } as TokenInfos;

  try {
    const provider = signer.provider;
    const code = await provider.getCode(token);

    if (code !== "0x") {
      const contract = new Contract(token, L2VE_ABI, signer);
      const symbol = await contract.symbol();
      const decimals = Number(await contract.decimals());
      const balance = await checkBalance(signer, SendType.token, token);
      const valid = true;

      return { symbol, decimals, balance, valid } as TokenInfos;
    }

    return invalid;
  } catch (error) {
    return invalid;
  }
}

export type Data = {
  wallet: string;
  value: string;
};

export async function sendEther(list: Data[], signer: JsonRpcSigner) {
  let recipients: string[] = [];
  let values: string[] = [];

  list.forEach((element) => {
    recipients.push(element.wallet);
    values.push(element.value);
  });

  console.log(recipients);
  console.log(values);
}
