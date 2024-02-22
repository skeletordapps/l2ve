import Notificate from "../components/notificate";
import { base } from "viem/chains";

export async function showNotifications(tx: any) {
  const txUrl = base.blockExplorers.default.url + "/tx/" + tx.hash.toString();
  Notificate({
    type: "",
    title: "Transaction Submitted",
    message: `Transaction successfully submitted.`,
    link: txUrl,
  });
  const txReceipt = await tx.wait(3);

  Notificate({
    type: "success",
    title: "Transaction Confirmed",
    message: `Transaction confirmed in block: ${txReceipt.blockNumber}.`,
    link: txUrl,
  });
}
