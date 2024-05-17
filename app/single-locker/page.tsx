"use client";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useCallback, useEffect, useState } from "react";
import ConnectButtonV4 from "../components/connectbuttonV4";
import { isOwner, unlock } from "../contracts/singleLocker";
import Nav from "../components/v2/nav";

export default function SingleLocker() {
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined);
  const [owner, setOwner] = useState(false);
  const [loading, setLoading] = useState(false);

  const { address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const onUnlock = useCallback(async () => {
    setLoading(true);
    if (signer) {
      await unlock(signer);
    }
    setLoading(false);
  }, [signer]);

  const getSigner = useCallback(async () => {
    if (walletProvider) {
      const provider = new BrowserProvider(walletProvider);
      const theSigner = await provider.getSigner();
      setSigner(theSigner);
    }
  }, [walletProvider]);

  useEffect(() => {
    getSigner();
  }, [walletProvider]);

  useEffect(() => {
    const checkOwner = async () => {
      if (signer) {
        const ownerChecked = await isOwner(signer);
        if (ownerChecked) setOwner(ownerChecked);
      }
    };
  }, [signer]);

  return (
    <>
      <Nav />

      <div className="flex flex-col relative min-h-[700px]">
        <div className="flex flex-col justify-center items-center w-full text-gray-900 pt-10 gap-4">
          <ConnectButtonV4 />
          {owner ? (
            <button
              className="px-5 py-2 bg-blue-love text-white hover:opacity-80"
              onClick={onUnlock}
            >
              {loading ? "loading..." : "Unlock"}
            </button>
          ) : signer && address ? (
            "Not allowed to unlock"
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
