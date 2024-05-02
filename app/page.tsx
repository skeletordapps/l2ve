"use client";
import Link from "next/link";
import Nav from "./components/v2/nav";
import Image from "next/image";
import { useCallback, useContext, useEffect, useState } from "react";
import { StateContext } from "./context/StateContext";

import {
  getOpenseaDataForPublic,
  initialize,
  mint,
  nftInfos,
  togglePause,
  walletInfos,
} from "./contracts/publicNft";

import { now } from "./utils/time";
import NftList from "./components/v2/nftList";
import { PublicNftInfos, PublicWalletInfos } from "./contracts/publicNft";
import { CustomConnectButtonV3 } from "./components/connectButtonV3";
import { useAccount, useNetwork } from "wagmi";
import {
  NFT,
  getOpenseaData,
  walletInfos as pastWalletInfos,
} from "./contracts/nft";

import type { WalletInfos } from "./contracts/nft";

export default function Home() {
  let [data, setData] = useState<PublicNftInfos | undefined>();
  let [userWallet, setUserWallet] = useState<PublicWalletInfos | undefined>(
    undefined
  );

  let [canMint, setCanMint] = useState(false);
  let [loading, setLoading] = useState(false);
  let [list, setList] = useState<NFT[] | null>(null);
  let [totalMinted, setTotalMinted] = useState(0);

  const { provider, signer } = useContext(StateContext);

  const { chain } = useNetwork();
  const account = useAccount();

  const onMint = useCallback(async () => {
    setLoading(true);
    if (signer) {
      await mint(signer);
      await getNftsInfos();
      await getUserInfos();
    }
    setLoading(false);
  }, [signer, setLoading]);

  const onTogglePause = useCallback(async () => {
    setLoading(true);
    if (signer) {
      await togglePause(signer);
      await getNftsInfos();
      await getUserInfos();
    }
    setLoading(false);
  }, [signer, setLoading]);

  const onInitialize = useCallback(async () => {
    setLoading(true);
    if (signer) {
      await initialize(signer);
      await getNftsInfos();
      await getUserInfos();
    }
    setLoading(false);
  }, [signer, setLoading]);

  const onCheckNfts = useCallback(async () => {
    if (signer && chain && !chain.unsupported && account) {
      const response = await getOpenseaData(signer);
      const publicResponse = await getOpenseaDataForPublic(signer);
      if (response && publicResponse) setList(response.concat(publicResponse));
    }
  }, [signer, account, chain, setList]);

  const isMintAvailable = useCallback(() => {
    if (!data) return false;
    if (data?.isPaused) return false;
    if (data?.startAt === 0) return false;
    if (now() < data?.startAt) return false;

    return true;
  }, [data]);

  const checkIfCanMint = useCallback(() => {
    if (!signer || !data || !userWallet) return setCanMint(false);
    if (userWallet.mintedsCount === 0 && isMintAvailable())
      return setCanMint(true);

    setCanMint(false);
  }, [signer, data, userWallet, setCanMint]);

  useEffect(() => {
    checkIfCanMint();
  }, [signer, data, userWallet]);

  const getUserInfos = useCallback(async () => {
    if (signer && chain && !chain.unsupported) {
      const pastWallet: WalletInfos | undefined = await pastWalletInfos(signer);
      const wallet: PublicWalletInfos | undefined = await walletInfos(signer);
      if (wallet) setUserWallet(wallet);
      if (pastWallet && wallet)
        setTotalMinted(pastWallet.mintedsCount + wallet.mintedsCount);
    }
  }, [signer, chain, setUserWallet]);

  useEffect(() => {
    if (signer) {
      getUserInfos();
      onCheckNfts();
    } else {
      setTotalMinted(0);
    }
  }, [signer, setTotalMinted]);

  const getNftsInfos = useCallback(async () => {
    setLoading(true);
    if (provider) {
      const response = await nftInfos(provider);
      setData(response as PublicNftInfos);
    }
    setLoading(false);
  }, [provider, setLoading]);

  useEffect(() => {
    getNftsInfos();
  }, [provider]);

  return (
    <>
      <Nav />
      <div className="flex flex-col relative">
        <div className="flex flex-col lg:flex-row  lg:px-[54px] relative">
          {/* LEFT */}
          <div className="flex items-center lg:items-start flex-col w-full text-[#0F61FF] lg:max-w-[25%] pt-[70px] lg:pt-[36px] px-4">
            <div className="flex-col items-center lg:items-start text-center lg:text-start">
              <Image
                src="/v2/rocket.svg"
                width={32.03}
                height={60.06}
                alt="rocket"
                className="mb-[-30px]"
              />
              <h1 className="text-[42px] leading-tight">
                PUBLIC MINT IS SOLD OUT!
              </h1>
              <div className="flex flex-col lg:max-w-[340px] lg:gap-4">
                <p className="lg:mt-4 text-[24px] lg:text-[28px] leading-[30px] text-center lg:text-start">
                  THANKS FOR PARTICIPATING.
                </p>
              </div>

              <div className="flex justify-center lg:justify-start">
                <Image
                  src="/v2/logo-space-sm.svg"
                  width={65.39}
                  height={44.52}
                  alt="logo-space-sm"
                  className="mt-10"
                />
              </div>

              {signer && totalMinted > 0 && (
                <div className="text-black/90 mt-5 text-xl">
                  Minted {totalMinted} tokens
                </div>
              )}

              {/* <div className="flex flex-col items-center lg:items-start mt-10 text-[22px] text-black gap-4">
                <button
                  disabled={loading || !canMint}
                  onClick={onMint}
                  type="button"
                  className={`inline-flex justify-center items-center w-[131px] h-[43.5px] rounded-md bg-blue-love ${
                    canMint ? "" : "opacity-30"
                  } text-[18px]  text-[#F0EFEF] focus:outline-none focus-visible:ring-0 `}
                >
                  {loading ? "LOADING..." : "MINT HERE"}
                </button>
              </div> */}

              {/* <Image
                src="/v2/rocket.svg"
                width={32.03}
                height={60.06}
                alt="rocket"
                className="mb-[-30px]"
              />
              <h1 className="text-[42px]">THANK YOU!</h1>
              <div className="flex flex-col lg:max-w-[240px] lg:gap-4">
                <p className="lg:mt-4 text-[24px] lg:text-[28px] leading-[30px] text-center lg:text-start">
                  THE MINT PERIOD IS OVER.
                </p>
              </div> */}
            </div>
          </div>

          {/* CENTER */}
          <div className="flex flex-col items-center w-full mt-11 min-h-[100%] relative">
            <Image
              src="/v2/computer.svg"
              width={756.3}
              height={627}
              alt="computer"
              className="w-full xl:w-[850px] xl:h-[710px] opacity-85"
            />

            {userWallet && userWallet.isOwner && (
              <div className="flex items-center gap-3 absolute bottom-0 left-0 pl-10 pb-10">
                <button
                  disabled={!data}
                  onClick={onTogglePause}
                  className="hover:opacity-75 hover:underline"
                >
                  {data && data?.isPaused ? "Unpause" : "Pause"}
                </button>
                <div className="h-3 w-1 bg-black" />
                <button
                  onClick={onInitialize}
                  disabled={!data || data.startAt > 0}
                  className="hover:opacity-75 hover:underline"
                >
                  {data && data?.startAt > 0 ? "Initialized" : "Initialize"}
                </button>
              </div>
            )}
          </div>
          {/* RIGHT */}
          <div className="hidden lg:flex flex-col w-full lg:max-w-[25%] pt-[36px]">
            <div className="flex flex-col items-end w-full h-full pb-24 gap-5">
              <CustomConnectButtonV3 />

              {signer && (
                <>
                  <Link
                    href="https://opensea.io/collection/l2ve-nft"
                    target="blank"
                    className="flex flex-col items-center gap-[10px]"
                  >
                    <div className="w-[66.48px] h-[76.48px] transition-all bg-opensea bg-no-repeat bg-cover hover:opacity-80" />
                    <span className="px-[12px] transition-all bg-[#F9F9F9] hover:bg-[#F9F9F9]/80 hover:shadow-inner text-black text-[14.62px] font-bold">
                      COLLECTION
                    </span>
                  </Link>
                  <NftList list={list} />
                </>
              )}
            </div>
          </div>

          {/* RIGHT MOBILE */}
          <div className="absolute top-0 right-4 flex items-end lg:hidden flex-col w-full pt-5 lg:pt-[36px]">
            <CustomConnectButtonV3 />
          </div>

          {/* NFTS MOBILE */}
          <NftList list={list} mobile />
        </div>

        {/* COPYRIGHTS */}
        <span className="absolute bottom-[340px] lg:bottom-[140px] left-[-40px] lg:left-0 -rotate-90 text-black text-[12px]">
          2024® ALL RIGHTS RESERVED
        </span>
      </div>
    </>
  );
}
