import { Contract, JsonRpcSigner } from "ethers";
import { CONTRACTS } from "../utils/consts";
import { SINGLE_LOCKER } from "../utils/abis";
import NotificateTx from "../utils/notificateTx";
import handleError from "../utils/handleErrors";

export async function isOwner(signer: JsonRpcSigner) {
  const contract = new Contract(CONTRACTS.singleLocker, SINGLE_LOCKER, signer);
  try {
    const owner = await contract.owner();
    const user = await signer.getAddress();

    return user === owner;
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}
export async function unlock(signer: JsonRpcSigner) {
  const contract = new Contract(CONTRACTS.singleLocker, SINGLE_LOCKER, signer);
  try {
    const network = await signer.provider?.getNetwork();
    const tx = await contract.unlock();
    await NotificateTx(network, tx);
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}
