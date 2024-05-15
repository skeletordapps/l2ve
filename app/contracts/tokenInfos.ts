import { Contract, JsonRpcSigner, formatEther } from "ethers";
import { L2VE_ABI } from "../utils/abis";
import { balanceOf } from "./balanceOf";

export type TokenInfos = {
  symbol: string;
  decimals: number;
  balance: number;
  valid: boolean;
  empty: boolean;
};

export const empty = {
  symbol: "",
  decimals: 0,
  balance: 0,
  valid: false,
  empty: true,
} as TokenInfos;

const invalid = {
  symbol: "",
  decimals: 0,
  balance: 0,
  valid: false,
  empty: false,
} as TokenInfos;

export async function tokenInfos(signer: JsonRpcSigner, token: string) {
  try {
    const provider = signer.provider;
    const userAddress = await signer.getAddress();
    const code = await provider.getCode(token);

    if (code !== "0x") {
      const contract = new Contract(token, L2VE_ABI, signer);
      const symbol = await contract.symbol();
      const decimals = Number(await contract.decimals());
      const tokenBalance = await balanceOf(
        L2VE_ABI,
        token,
        userAddress,
        undefined,
        signer
      );

      const balance = Number(formatEther(tokenBalance));
      const valid = true;

      return { symbol, decimals, balance, valid } as TokenInfos;
    }

    return invalid;
  } catch (error) {
    return invalid;
  }
}
