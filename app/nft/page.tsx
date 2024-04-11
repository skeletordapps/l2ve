"use client";
import Link from "next/link";
import Nav from "../components/v2/nav";
import Image from "next/image";
import { useCallback, useContext, useEffect, useState } from "react";
import BoxModal from "../components/v2/boxModal";
import { useConnectModal, useChainModal } from "@rainbow-me/rainbowkit";
import { useAccount, useNetwork, useDisconnect } from "wagmi";
import { StateContext } from "../context/StateContext";
import { WalletInfos, walletInfos } from "../contracts/nft";
import { CustomConnectButtonV2 } from "../components/connectButtonV2";

const friends = [
  {
    src: "/v2/friends/logos/tybg.svg",
    href: "https://basescan.org/token/0x0d97f261b1e88845184f678e2d1e7a98d9fd38de",
    w: 33,
    h: 33,
  },
  {
    src: "/v2/friends/logos/degen.svg",
    href: "https://basescan.org/address/0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed",
    w: 28.51,
    h: 24.12,
  },
  {
    src: "/v2/friends/logos/normie.svg",
    href: "https://basescan.org/token/0x7f12d13b34f5f4f0a9449c16bcd42f0da47af200",
    w: 33,
    h: 33,
  },
  {
    src: "/v2/friends/logos/doginme.svg",
    href: "https://basescan.org/token/0x6921B130D297cc43754afba22e5EAc0FBf8Db75b",
    w: 81.13,
    h: 20.41,
  },
  {
    src: "/v2/friends/logos/brett.svg",
    href: "https://basescan.org/token/0x532f27101965dd16442e59d40670faf5ebb142e4",
    w: 38.67,
    h: 12.07,
  },
];

const text =
  "PLEASE CONNECT YOUR WALLET TO CHECK IF YOU ARE ELIGIBLE FOR ROUND 1!";
const textError = "SORRY... YOU ARE NOT ELIGIBLE";

const buttonText = "CONNECT WALLET";
const buttonTextError = "CONNECT ANOTHER WALLET";

export default function Home() {
  let [isOpen, setIsOpen] = useState(false);
  let [hasError, setHasError] = useState(false);
  let [userWallet, setUserWallet] = useState<WalletInfos | undefined>(
    undefined
  );
  let [modalText, setModalText] = useState(text);
  let [modalButtonText, setModalButtonText] = useState(buttonText);

  const account = useAccount();
  const { chain } = useNetwork();
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { signer } = useContext(StateContext);
  const { disconnectAsync } = useDisconnect();

  const onCheckEligibility = useCallback(async () => {
    if (signer && chain && !chain.unsupported) {
      const wallet: WalletInfos | undefined = await walletInfos(signer);
      if (wallet) setUserWallet(wallet);
    }
  }, [signer, account, chain]);

  useEffect(() => {
    onCheckEligibility();
  }, [signer]);

  useEffect(() => {
    if (signer && chain && userWallet && !userWallet.isEligibleForRoundOne) {
      setHasError(true);
      setModalText(textError);
      setModalButtonText(buttonTextError);
      return;
    }

    setModalText(text);
    setModalButtonText(buttonText);
    setHasError(false);

    if (chain && chain.unsupported) setHasError(true);
  }, [chain, signer, userWallet]);

  useEffect(() => {
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

  return (
    <>
      <Nav />
      <div className="flex flex-col">
        <div className="flex flex-row px-[54px] pt-[36px]">
          {/* LEFT */}
          <div className="flex flex-col w-full text-[#0F61FF]">
            <div
              className={`${
                userWallet && userWallet.isEligibleForRoundOne
                  ? "flex"
                  : "hidden"
              } flex-col`}
            >
              <Image
                src="/v2/rocket.svg"
                width={32.03}
                height={60.06}
                alt="rocket"
                className="mb-[-30px]"
              />
              <h1 className="text-[42px]">CONGRATS!</h1>
              <div className="flex flex-col max-w-[240px] gap-4">
                <p className="mt-4 text-[28px] leading-[30px]">
                  YOU ARE eligible FOR THE FREE MINT.
                </p>

                {/* L2VE HOLDER */}
                {userWallet &&
                  userWallet.isEligibleForRoundOne &&
                  userWallet.holderType === "L2VE" && (
                    <p className="text-[28px] leading-[30px]">
                      AS A L2VE HOLDER YOU CAN MINT 5 NFTS!
                    </p>
                  )}

                {/* COMMUNITY HOLDER */}
                {userWallet &&
                  userWallet.isEligibleForRoundOne &&
                  userWallet.holderType === "community" && (
                    <p className="text-[28px] leading-[30px]">
                      AS A COMMUNITY HOLDER YOU CAN MINT 2 NFTS!
                    </p>
                  )}
              </div>

              {/* L2VE HOLDER */}
              {userWallet &&
                userWallet.isEligibleForRoundOne &&
                userWallet.holderType === "L2VE" && (
                  <Image
                    src="/v2/logo-space-sm.svg"
                    width={65.39}
                    height={44.52}
                    alt="logo-space-sm"
                    className="mt-10"
                  />
                )}

              {/* COMMUNITY HOLDER */}
              {userWallet &&
                userWallet.isEligibleForRoundOne &&
                userWallet.holderType === "community" && (
                  <div className="flex items-center gap-[22.5px] mt-10">
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
                        />
                      </Link>
                    ))}
                  </div>
                )}

              <button
                type="button"
                className="inline-flex justify-center items-center w-[131px] h-[33.5px] rounded-md  bg-button-v2-sm text-[18px]  text-[#F0EFEF] focus:outline-none focus-visible:ring-0 mt-10  hover:animate-pulse "
              >
                MINT HERE
              </button>
            </div>
          </div>

          {/* CENTER */}
          <div className="flex flex-col w-full pt-[137px]">
            <Image
              src="/v2/computer.svg"
              width={756.3}
              height={627}
              alt="computer"
              className="min-w-[756.3px] min-h-[627px]"
            />
          </div>

          {/* RIGHT */}
          <div className="flex flex-col w-full">
            {signer && (
              <div className="flex flex-col items-end w-full">
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
        </div>
      </div>

      <BoxModal isOpen={isOpen} error={hasError}>
        <div className="flex flex-col justify-center items-center w-full h-full text-center px-[72px] gap-[30px] pt-8">
          <Image
            src="/v2/logo-space.svg"
            width={79.32}
            height={54.01}
            alt="logo-space"
          />
          <p className="text-[#F5F5F5]">{modalText}</p>

          <CustomConnectButtonV2 />

          {/* <button
            type="button"
            className={`inline-flex justify-center items-center ${
              modalButtonText === buttonText ? "w-[131px]" : "w-[188.45px]"
            } h-[33.5px] rounded-md  bg-button-v2-lg  text-[#F0EFEF] focus:outline-none focus-visible:ring-0 z-20`}
            onClick={chain?.unsupported ? openChainModal : openConnectModal}
          >
            {chain?.unsupported ? "WRONG CHAIN" : modalButtonText}
          </button> */}
        </div>
      </BoxModal>
    </>
  );
}
