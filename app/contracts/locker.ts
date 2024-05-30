import {
  Contract,
  JsonRpcProvider,
  JsonRpcSigner,
  formatUnits,
  parseUnits,
} from "ethers";
import { CONTRACTS } from "../utils/consts";
import { ERC20_ABI, L2VE_ANY_LOCKER } from "../utils/abis";
import NotificateTx from "../utils/notificateTx";
import handleError from "../utils/handleErrors";
import { getAllowance } from "./allowance";
import { approve } from "./approve";

const BASE_RPC_URL = process.env.NEXT_PUBLIC_RPC_HTTPS as string;
// const TEST_RPC = "http://127.0.0.1:8545";

async function getContract(signer?: JsonRpcSigner) {
  try {
    const provider = new JsonRpcProvider(BASE_RPC_URL);
    const contractAddress = CONTRACTS.locker;
    const contract = new Contract(
      contractAddress,
      L2VE_ANY_LOCKER,
      signer || provider
    );

    return contract;
  } catch (e) {
    handleError({ e: e, notificate: true });
  }
}

export async function hasAllowance(
  token: string,
  decimals: number,
  amount: string,
  signer: JsonRpcSigner
) {
  try {
    const allowance = Number(
      formatUnits(
        await getAllowance(ERC20_ABI, token, CONTRACTS.locker, signer),
        decimals
      )
    );

    return allowance >= Number(amount);
  } catch (error) {
    handleError({ e: error as Error, notificate: false });
    return false;
  }
}

export async function handleApproval(
  token: string,
  decimals: number,
  amount: string,
  signer: JsonRpcSigner
) {
  try {
    await approve(
      ERC20_ABI,
      token,
      CONTRACTS.locker,
      signer,
      parseUnits(amount, decimals)
    );
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

export async function lock(
  token: string,
  decimals: number,
  amount: string,
  lockUntil: number,
  signer: JsonRpcSigner
) {
  const contract = new Contract(CONTRACTS.locker, L2VE_ANY_LOCKER, signer);
  let success = false;
  try {
    const userAddress = await signer.getAddress();
    const network = await signer.provider?.getNetwork();
    const tx = await contract.lock(
      userAddress,
      token,
      parseUnits(amount, decimals),
      lockUntil
    );
    await NotificateTx(network, tx);
    success = true;
    return { success };
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
    return { success };
  }
}

export async function unlock(
  token: string,
  lockId: number,
  signer: JsonRpcSigner
) {
  const contract = new Contract(CONTRACTS.locker, L2VE_ANY_LOCKER, signer);
  try {
    const userAddress = await signer.getAddress();
    const network = await signer.provider?.getNetwork();
    const tx = await contract.unlock(userAddress, token, lockId);
    await NotificateTx(network, tx);
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

export type Event = {
  wallet: string;
  lockData: {
    id: number;
    wallet: string;
    token: string;
    symbol: string;
    decimals: number;
    amount: number;
    lockedAt: number;
    lockedUntil: number;
    unlockedAt: number;
  };
};

export async function getAllEvents(signer: JsonRpcSigner) {
  try {
    const contract = await getContract();
    const provider = signer.provider;

    const startBlock = 14496383;
    const currentBlock = await provider.getBlockNumber();
    const blocksPerFilter = 10000;
    let lockingEvents: Event[] = [];
    let unlockingEvents: Event[] = [];

    for (
      let fromBlock = startBlock;
      fromBlock <= currentBlock;
      fromBlock += blocksPerFilter
    ) {
      const toBlock = Math.min(fromBlock + blocksPerFilter - 1, currentBlock); // Ensure toBlock doesn't exceed current block
      const lockFilter = contract!.filters.Locked();

      const lockEvents = await contract!.queryFilter(
        lockFilter,
        fromBlock,
        toBlock
      );

      const unlockFilter = contract!.filters.Unlocked();
      const unlockEvents = await contract!.queryFilter(
        unlockFilter,
        fromBlock,
        toBlock
      );

      const wallet = await signer.getAddress();

      if (lockEvents && lockEvents?.length > 0) {
        lockEvents.forEach(async (event: any) => {
          const log = event.args as [
            string,
            [
              number,
              string,
              string,
              string,
              number,
              number,
              number,
              number,
              number
            ]
          ];

          if (log[0] === wallet) {
            lockingEvents.push({
              wallet: log[0],
              lockData: {
                id: Number(log[1][0]),
                wallet: log[1][1],
                token: log[1][2],
                symbol: log[1][3],
                decimals: Number(log[1][4]),
                amount: Number(formatUnits(log[1][5], Number(log[1][4]))),
                lockedAt: Number(log[1][6]),
                lockedUntil: Number(log[1][7]),
                unlockedAt: Number(log[1][8]),
              },
            });
          }
        });
      }

      if (unlockEvents && unlockEvents?.length > 0) {
        unlockEvents.forEach(async (event: any) => {
          const log = event.args as [
            string,
            [
              number,
              string,
              string,
              string,
              number,
              number,
              number,
              number,
              number
            ]
          ];

          if (log[0] === wallet) {
            unlockingEvents.push({
              wallet: log[0],
              lockData: {
                id: Number(log[1][0]),
                wallet: log[1][1],
                token: log[1][2],
                symbol: log[1][3],
                decimals: Number(log[1][4]),
                amount: Number(formatUnits(log[1][5], Number(log[1][4]))),
                lockedAt: Number(log[1][6]),
                lockedUntil: Number(log[1][7]),
                unlockedAt: Number(log[1][8]),
              },
            });
          }
        });
      }
    }

    lockingEvents.forEach((event: Event) => {
      const unlockingEvent = unlockingEvents.find(
        (unlockingEvent: Event) =>
          unlockingEvent.lockData.id === event.lockData.id &&
          unlockingEvent.lockData.wallet === event.lockData.wallet &&
          unlockingEvent.lockData.token === event.lockData.token
      );

      if (unlockingEvent) {
        event.lockData.unlockedAt = unlockingEvent.lockData.unlockedAt;
      }
    });

    return lockingEvents;
  } catch (error) {
    console.error("Error fetching contract log events:", error);
    return [];
  }
}
