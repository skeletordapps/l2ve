import {
  useWeb3ModalAccount,
  useDisconnect,
  useWeb3Modal,
} from "@web3modal/ethers/react";
import Image from "next/image";
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
      className="flex flex-col items-center gap-[2px] lg:gap-[20px] hover:opacity-70 lg:hover:opacity-100"
    >
      <div className="hidden lg:flex w-[46.48px] h-[32.18px] transition-all bg-wallet-connected-v2 hover:bg-wallet-connected-v2-hover" />
      <Image
        src="/v2/wallet-connected.svg"
        width={24}
        height={24}
        alt="collection"
        className="flex lg:hidden self-center w-[30px] h-[23px]"
      />
      <div className="lg:w-28 text-center transition-all bg-[#F9F9F9] hover:bg-[#F9F9F9]/80 hover:shadow-inner text-black text-[14.62px] font-bold">
        {text.toUpperCase()}
      </div>
    </button>
  );
}
