"use client";
import Link from "next/link";
import Nav from "./components/v2/nav";
import Image from "next/image";
import { useCallback, useContext, useEffect, useState } from "react";
import BoxModal from "./components/v2/boxModal";
import { useAccount, useNetwork, useDisconnect } from "wagmi";
import { StateContext } from "./context/StateContext";
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
import { CustomConnectButtonV2 } from "./components/connectButtonV2";
import { now } from "./utils/time";

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
  let [tokens, setTokens] = useState<TokenMetadata[] | undefined>();
  let [loading, setLoading] = useState(false);

  const account = useAccount();
  const { chain } = useNetwork();
  const { provider, signer } = useContext(StateContext);
  const { disconnectAsync } = useDisconnect();

  const imageLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

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

  const onCheckEligibility = useCallback(async () => {
    if (signer && chain && !chain.unsupported) {
      const wallet: WalletInfos | undefined = await walletInfos(signer);
      if (wallet) setUserWallet(wallet);
    }
  }, [signer, account, chain]);

  useEffect(() => {
    onCheckEligibility();
  }, [signer]);

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
  }, [data, userWallet]);

  useEffect(() => {
    checkIfCanMint();
  }, [data, userWallet]);

  useEffect(() => {
    if (signer && chain && userWallet && !userWallet.isEligibleForRoundOne) {
      setHasError(true);
      setModalText(textError);
      return;
    }

    setModalText(text);
    setHasError(false);

    if (chain && chain.unsupported) setHasError(true);
  }, [chain, signer, userWallet]);

  useEffect(() => {
    if (userWallet && userWallet.mintedsCount > 0) {
      return setIsOpen(false);
    }

    if (
      !chain ||
      !signer ||
      chain.unsupported ||
      !userWallet ||
      !userWallet.isEligibleForRoundOne
    ) {
      setIsOpen(true);
      return;
    }

    if (userWallet && !userWallet.isEligibleForRoundOne) {
      return setIsOpen(true);
    }

    setIsOpen(false);
  }, [chain, signer, userWallet]);

  const getNftsInfos = useCallback(async () => {
    if (provider) {
      const response = await nftInfos(provider);
      setData(response as NftInfos);
    }
  }, [provider]);

  useEffect(() => {
    getNftsInfos();
  }, [provider]);

  return (
    <>
      <Nav />
      <div className="flex flex-col relative">
        <div className="flex flex-col lg:flex-row  lg:px-[54px] ">
          {/* LEFT */}
          <div className="flex items-center lg:items-start flex-col w-full text-[#0F61FF] lg:max-w-[20%] pt-[70px] lg:pt-[36px] px-4">
            <div
              className={`${
                userWallet && userWallet.isEligibleForRoundOne
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
                userWallet?.isEligibleForRoundOne &&
                userWallet?.holderType === "L2VE" && (
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
                userWallet?.isEligibleForRoundOne &&
                userWallet?.holderType === "community" && (
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
                    className={`inline-flex justify-center items-center w-[131px] h-[33.5px] rounded-md  ${
                      canMint
                        ? "bg-button-v2-sm hover:animate-pulse"
                        : "bg-button-v2-sm opacity-30"
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
          <div className="hidden lg:flex flex-col w-full lg:max-w-[20%] pt-[36px]">
            {signer && (
              <div className="flex flex-col items-end w-full h-full pb-24 gap-5">
                <button
                  onClick={() => disconnectAsync()}
                  className="flex flex-col items-center gap-[10px]"
                >
                  <div className="w-[46.48px] h-[32.18px] transition-all bg-wallet-connected-v2 hover:bg-wallet-connected-v2-hover" />
                  <span className="px-[12px] transition-all bg-[#F9F9F9] hover:bg-[#F9F9F9]/80 hover:shadow-inner text-black text-[14.62px] font-bold">
                    DISCONNECT
                  </span>
                </button>

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
                {/* 
                {tokens && (
                  <div className="flex flex-col gap-8 w-full max-w-[80px] mt-10 justify-end">
                    {tokens.map((item, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <Image
                          loader={imageLoader}
                          src={item?.imageUrl || "/button.png"}
                          width={40}
                          height={40}
                          alt={item?.id?.toString() || "nft"}
                          loading="lazy"
                          className="transition-all hover:-rotate-12 border-2 border-black/20"
                        />
                        <div className="flex justify-center items-center self-center text-center mt-4 w-[79px] h-[20px] px-[12px] transition-all bg-[#F9F9F9] hover:bg-[#F9F9F9]/80 hover:shadow-inner text-black text-[14.62px] font-bold">
                          {item?.id}
                        </div>
                      </div>
                    ))}
                  </div>
                )} */}
              </div>
            )}
          </div>

          {/* RIGHT MOBILE */}
          <div className="absolute top-0 right-4 flex lg:hidden flex-col w-full pt-5 lg:pt-[36px]">
            {signer && (
              <div className="flex flex-col flex-wrap items-end w-full h-full pb-24">
                <button
                  onClick={() => disconnectAsync()}
                  className="flex flex-col items-center gap-[20px]"
                >
                  <div className="w-[46.48px] h-[32.18px] transition-all bg-wallet-connected-v2 hover:bg-wallet-connected-v2-hover" />
                  <span className="px-[12px] transition-all bg-[#F9F9F9] hover:bg-[#F9F9F9]/80 hover:shadow-inner text-black text-[14.62px] font-bold">
                    DISCONECT
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* NFTS MOBILE */}
          {/* {tokens && (
            <div className="flex lg:hidden justify-center items-center flex-wrap w-full my-10 gap-4">
              {tokens.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Image
                    loader={imageLoader}
                    src={item?.imageUrl || "/button.png"}
                    width={40}
                    height={40}
                    alt={item?.id?.toString() || "nft"}
                    loading="lazy"
                    className="transition-all hover:-rotate-12 border-2 border-black/20"
                  />
                  <div className="flex justify-center items-center self-center text-center mt-4 w-[79px] h-[20px] px-[12px] transition-all bg-[#F9F9F9] hover:bg-[#F9F9F9]/80 hover:shadow-inner text-black text-[14.62px] font-bold">
                    {item?.id}
                  </div>
                </div>
              ))}
            </div>
          )} */}
        </div>

        {/* COPYRIGHTS */}
        <span className="absolute bottom-[340px] lg:bottom-[140px] left-[-40px] lg:left-0 -rotate-90 text-black text-[12px]">
          2024® ALL RIGHTS RESERVED
        </span>
      </div>

      <BoxModal isOpen={isOpen} error={hasError}>
        <div className="flex flex-col justify-center items-center w-full h-full text-center lg:px-[72px] gap-[30px] pt-8">
          <Image
            src="/v2/logo-space.svg"
            width={79.32}
            height={54.01}
            alt="logo-space"
          />
          <p className="text-[#F5F5F5] text-[18px]">{modalText}</p>

          <CustomConnectButtonV2
            isEligible={
              userWallet && userWallet.isEligibleForRoundOne ? true : false
            }
          />
        </div>
      </BoxModal>
    </>
  );
}
