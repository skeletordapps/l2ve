import { Contract, JsonRpcSigner, formatEther, formatUnits } from "ethers";
import { L2VE_ABI } from "../utils/abis";

export type TokenInfos = {
  token: string;
  symbol: string;
  decimals: number;
  balance: number;
  valid: boolean;
  empty: boolean;
};

export const empty = {
  token: "",
  symbol: "",
  decimals: 0,
  balance: 0,
  valid: false,
  empty: true,
} as TokenInfos;

const invalid = {
  token: "",
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
      const balance = Number(
        formatUnits(await contract.balanceOf(userAddress), decimals)
      );
      const valid = true;

      return { token, symbol, decimals, balance, valid } as TokenInfos;
    }

    return invalid;
  } catch (error) {
    return invalid;
  }
}
