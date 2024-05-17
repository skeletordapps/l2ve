"use client";
import Link from "next/link";
import Nav from "./components/v2/nav";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import BoxModal from "./components/v2/boxModal";

import type {
  WalletInfos,
  NftInfos,
  TokenMetadata,
  Nfts,
} from "./contracts/nft";
import {
  getNFTData,
  initialize,
  mint,
  nftInfos,
  togglePause,
  walletInfos,
} from "./contracts/nft";

import { now } from "./utils/time";
import Icons from "./components/v2/icons";
import {
  useDisconnect,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import ConnectButtonV4 from "./components/connectbuttonV4";

const friends = [
  {
    src: "/v2/friends/logos/tybg.svg",
    href: "https://basescan.org/token/0x0d97f261b1e88845184f678e2d1e7a98d9fd38de",
    w: 33,
    h: 33,
    style: "min-w-[33px] min-h-[33px]",
  },
  {
    src: "/v2/friends/logos/degen.svg",
    href: "https://basescan.org/address/0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed",
    w: 28.51,
    h: 24.12,
    style: "min-w-[28.51px] min-h-[24.12px]",
  },
  {
    src: "/v2/friends/logos/normie.svg",
    href: "https://basescan.org/token/0x7f12d13b34f5f4f0a9449c16bcd42f0da47af200",
    w: 33,
    h: 33,
    style: "min-w-[33px] min-h-[33px]",
  },
  {
    src: "/v2/friends/logos/doginme.svg",
    href: "https://basescan.org/token/0x6921B130D297cc43754afba22e5EAc0FBf8Db75b",
    w: 81.13,
    h: 20.41,
    style: "min-w-[81.13px] min-h-[20.41px]",
  },
  {
    src: "/v2/friends/logos/brett.svg",
    href: "https://basescan.org/token/0x532f27101965dd16442e59d40670faf5ebb142e4",
    w: 38.67,
    h: 12.07,
    style: "min-w-[38.67px] min-h-[12.07px]",
  },
];

const text =
  "PLEASE CONNECT YOUR WALLET TO CHECK IF YOU ARE ELIGIBLE FOR ROUND 1!";
const textError = "SORRY... YOU ARE NOT ELIGIBLE";

export default function Home() {
  let [isOpen, setIsOpen] = useState(false);
  let [hasError, setHasError] = useState(false);
  let [data, setData] = useState<NftInfos | undefined>();
  let [userWallet, setUserWallet] = useState<WalletInfos | undefined>(
    undefined
  );
  let [modalText, setModalText] = useState(text);
  let [canMint, setCanMint] = useState(false);
  let [loading, setLoading] = useState(false);
  let [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined);

  const { walletProvider } = useWeb3ModalProvider();
  const { disconnect } = useDisconnect();

  const onMint = useCallback(async () => {
    setLoading(true);
    if (signer) {
      await mint(signer);
      await getNftsInfos();
      await onCheckEligibility();
    }
    setLoading(false);
  }, [signer, setLoading]);

  const onTogglePause = useCallback(async () => {
    setLoading(true);
    if (signer) {
      await togglePause(signer);
      await getNftsInfos();
      await onCheckEligibility();
    }
    setLoading(false);
  }, [signer, setLoading]);

  const onInitialize = useCallback(async () => {
    setLoading(true);
    if (signer) {
      await initialize(signer);
      await getNftsInfos();
      await onCheckEligibility();
    }
    setLoading(true);
  }, [signer, setLoading]);

  // const onCheckNfts = useCallback(async () => {
  //   if (signer && chain && !chain.unsupported && account) {
  //     const nfts = await fetch(`/api/nft/${chain.id}/${account.address}`);
  //     console.log(nfts);
  //   }
  // }, [signer, account, chain]);

  const onCheckEligibility = useCallback(async () => {
    if (signer) {
      const wallet: WalletInfos | undefined = await walletInfos(signer);
      if (wallet) setUserWallet(wallet);
    }
  }, [signer]);

  useEffect(() => {
    onCheckEligibility();
  }, [signer]);

  const round2IsOver = useCallback(() => {
    if (data) {
      const datetime = now();
      if (datetime >= data.roundTwoFinishAt) return true;
    }

    return false;
  }, [data]);

  const checkIfCanMint = useCallback(() => {
    if (data && userWallet) {
      const datetime = now();

      if (data.isPaused || data.startAt === 0) return setCanMint(false);

      if (
        userWallet.isEligibleForRoundOne &&
        userWallet.mintedsCount === 0 &&
        datetime <= data.roundOneFinishAt
      ) {
        return setCanMint(true);
      } else if (
        userWallet.isEligibleForRoundTwo &&
        datetime > data.roundOneFinishAt &&
        datetime <= data.roundTwoFinishAt &&
        (userWallet.mintedsCount === 2 || userWallet.mintedsCount === 5)
      ) {
        return setCanMint(true);
      }
    }

    setCanMint(false);
  }, [data, userWallet, setCanMint]);

  useEffect(() => {
    checkIfCanMint();
  }, [data, userWallet]);

  useEffect(() => {
    if (
      signer &&
      data &&
      data.currentRound === 1 &&
      userWallet &&
      !userWallet.isEligibleForRoundOne
    ) {
      setHasError(true);
      setModalText(textError);
      return;
    }

    if (
      signer &&
      data &&
      data.currentRound === 2 &&
      userWallet &&
      !userWallet.isEligibleForRoundTwo
    ) {
      setHasError(true);
      setModalText(textError);
      return;
    }

    setModalText(text);
    setHasError(false);
  }, [signer, userWallet, data]);

  useEffect(() => {
    if (signer && userWallet && userWallet.mintedsCount > 0) {
      return setIsOpen(false);
    }

    if (!signer || !data || !userWallet) {
      setIsOpen(true);
      return;
    }

    if (data.currentRound === 1 && !userWallet.isEligibleForRoundOne) {
      return setIsOpen(true);
    }
    if (data.currentRound === 2 && !userWallet.isEligibleForRoundTwo) {
      setIsOpen(true);
      return;
    }

    setIsOpen(false);
  }, [signer, userWallet]);

  const getSigner = useCallback(async () => {
    if (walletProvider) {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      setSigner(signer);
    }
  }, [walletProvider]);

  useEffect(() => {
    getSigner();
  }, [walletProvider]);

  const getNftsInfos = useCallback(async () => {
    {
      const response = await nftInfos();
      setData(response as NftInfos);
    }
  }, []);

  useEffect(() => {
    getNftsInfos();
  }, []);

  return (
    <>
      <Nav />
      <div className="flex flex-col relative">
        <div className="flex flex-col lg:flex-row  lg:px-[54px] ">
          {/* LEFT */}
          <div className="flex items-center lg:items-start flex-col w-full text-[#0F61FF] lg:max-w-[20%] pt-[70px] lg:pt-[36px] px-4">
            {/* MINT IS OVER */}
            <div
              className={`${
                round2IsOver() ? "flex" : "hidden"
              } flex-col items-center lg:items-start`}
            >
              <Image
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
              </div>
            </div>

            {/* MINT IS HAPPENING */}
            <div
              className={`${
                userWallet &&
                userWallet.isEligibleForRoundTwo &&
                !round2IsOver()
                  ? "flex"
                  : "hidden"
              } flex-col items-center lg:items-start`}
            >
              <Image
                src="/v2/rocket.svg"
                width={32.03}
                height={60.06}
                alt="rocket"
                className="mb-[-30px]"
              />
              <h1 className="text-[42px]">CONGRATS!</h1>
              <div className="flex flex-col lg:max-w-[240px] lg:gap-4">
                <p className="lg:mt-4 text-[24px] lg:text-[28px] leading-[30px] text-center lg:text-start">
                  YOU ARE eligible FOR THE FREE MINT.
                </p>

                {/* L2VE HOLDER */}
                {!data?.isPaused &&
                  userWallet &&
                  userWallet.isEligibleForRoundOne &&
                  userWallet.holderType === "L2VE" && (
                    <p className="text-[24px] lg:text-[28px] leading-[30px] text-center lg:text-start">
                      AS A L2VE HOLDER YOU CAN MINT{" "}
                      {data?.currentRound === 1 ? "5" : "2"} NFTS IN ROUND{" "}
                      {data?.currentRound}!
                    </p>
                  )}

                {/* COMMUNITY HOLDER */}
                {!data?.isPaused &&
                  userWallet &&
                  userWallet?.isEligibleForRoundOne &&
                  userWallet?.holderType === "community" && (
                    <p className="text-[24px] lg:text-[28px] leading-[30px] text-center lg:text-start">
                      AS A COMMUNITY HOLDER YOU CAN MINT 2 NFTS IN ROUND{" "}
                      {data?.currentRound}!
                    </p>
                  )}
              </div>

              {/* L2VE HOLDER */}
              {!data?.isPaused &&
                userWallet &&
                ((userWallet?.isEligibleForRoundOne &&
                  userWallet?.holderType === "L2VE") ||
                  userWallet.mintedsCount === 5 ||
                  userWallet.mintedsCount === 7) && (
                  <Image
                    src="/v2/logo-space-sm.svg"
                    width={65.39}
                    height={44.52}
                    alt="logo-space-sm"
                    className="mt-10"
                  />
                )}

              {/* COMMUNITY HOLDER */}
              {!data?.isPaused &&
                userWallet &&
                ((userWallet?.isEligibleForRoundOne &&
                  userWallet?.holderType === "community") ||
                  userWallet.mintedsCount === 2 ||
                  userWallet.mintedsCount === 4) && (
                  <div className="flex items-center gap-[22.5px] mt-4 lg:mt-10">
                    {friends.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        target="blank"
                        className="transition-all hover:animate-bounce"
                      >
                        <Image
                          src={item.src}
                          width={item.w}
                          height={item.h}
                          alt="friends"
                          className={item.style}
                        />
                      </Link>
                    ))}
                  </div>
                )}

              {userWallet && userWallet?.mintedsCount > 0 && (
                <div className="text-black/90 mt-5 text-xl">
                  Minted {userWallet?.mintedsCount} tokens
                </div>
              )}

              <div className="flex flex-col mt-10 text-[22px] text-black gap-4">
                {data?.isPaused ? (
                  <div>Mint is currently paused...</div>
                ) : !data?.isPaused && data?.roundOneFinishAt === 0 ? (
                  <div>Round 1 is about to start soon...</div>
                ) : (
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
                )}
              </div>
            </div>
          </div>

          {/* CENTER */}
          <div className="flex flex-col items-center w-full mt-11 min-h-[100%] relative">
            <Image
              src="/v2/computer.svg"
              width={756.3}
              height={627}
              alt="computer"
              className="w-full lg:w-[950px] lg:h-[810px] opacity-85"
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
          <Icons />
        </div>

        {/* COPYRIGHTS */}
        <span className="absolute bottom-[340px] lg:bottom-[140px] left-[-40px] lg:left-0 -rotate-90 text-black text-[12px]">
          2024® ALL RIGHTS RESERVED
        </span>
      </div>
    </>
  );
}
