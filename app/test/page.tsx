"use client";
import { BrowserProvider } from "ethers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useCallback, useEffect } from "react";
import ConnectButtonV4 from "../components/connectbuttonV4";
import { getAllEvents } from "../contracts/locker";

export default function Home() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const getSigner = useCallback(async () => {
    if (walletProvider) {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
    }
  }, [walletProvider]);

  useEffect(() => {
    getSigner();
  }, [walletProvider]);

  return (
    <div>
      <ConnectButtonV4 />
    </div>
  );
}
