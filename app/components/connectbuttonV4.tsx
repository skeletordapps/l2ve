import {
  useWeb3ModalAccount,
  useDisconnect,
  useWeb3Modal,
} from "@web3modal/ethers/react";
import { useEffect, useState } from "react";

export default function ConnectButtonV4() {
  const [text, setText] = useState("Connect wallet");
  const { isConnected } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    setText(isConnected ? "DISCONNECT" : "CONNECT WALLET");
  }, [isConnected]);

  return (
    <button
      onClick={() => (!isConnected ? open() : disconnect())}
      className="flex flex-col items-center gap-3 sm:gap-[20px]"
    >
      <div className="w-[46.48px] h-[32.18px] transition-all bg-wallet-connected-v2 hover:bg-wallet-connected-v2-hover" />
      <div className="px-[12px] transition-all bg-[#F9F9F9] hover:bg-[#F9F9F9]/80 hover:shadow-inner text-black text-[11px] sm:text-[14.62px] font-bold">
        {text}
      </div>
    </button>
  );
}
