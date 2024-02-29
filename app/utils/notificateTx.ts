import Notificate from "../components/notificate";
import { EXPLORER_LINKS } from "./consts";

export default async function NotificateTx(network: any, tx: any) {
  const txUrl =
    EXPLORER_LINKS[network!.chainId.toString()] + tx.hash.toString();

  Notificate({
    type: "",
    title: "Transaction Submitted",
    message: "Your transaction was successfully submitted.",
    link: txUrl,
  });

  const receipt = await tx.wait();
  Notificate({
    type: "success",
    title: "Transaction Confirmed",
    message: `Confirmed in block ${receipt.blockNumber}`,
    link: txUrl,
  });
}
