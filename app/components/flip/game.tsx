"use client";
import { StateContext, Theme } from "@/app/context/StateContext";
import {
  Balances,
  FlipInfos,
  buy,
  claim,
  convertIntickets,
  getBalances,
  getInfos,
  handleApproval,
  hasAllowance,
  play,
  togglePause,
  withdraw,
  withdrawLosses,
} from "@/app/contracts/flip";
import {
  coinflip,
  coinflipDark,
  head,
  headDark,
  tails,
  tailsDark,
} from "@/public/svgs";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNetwork, useAccount } from "wagmi";

export default function Game() {
  const [isLoading, setIsLoading] = useState(false);
  const [side, setSide] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ticketsToBuy, setTicketsToBuy] = useState(1);
  const [ticketsToBet, setTicketsToBet] = useState(1);
  const [flipInfos, setFlipInfos] = useState<null | FlipInfos>(null);
  const [balances, setBalances] = useState<null | Balances>(null);
  const [isWinner, setIsWinner] = useState<null | boolean>(null);
  const [canBuy, setCanBuy] = useState(false);
  const [canClaim, setCanClaim] = useState(false);
  const [canFlip, setCanFlip] = useState(false);
  const [walletHasAllowance, setWalletHasAllowance] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { theme, provider, signer } = useContext(StateContext);

  const network = useNetwork();
  const { address } = useAccount();

  const onApprove = useCallback(async () => {
    setIsLoading(true);
    if (signer && !network.chain?.unsupported && flipInfos) {
      const amount = (ticketsToBuy * flipInfos?.price).toString();
      await handleApproval(amount, signer);
      await onGetInfos();
      await onGetBalances();
      await checkAllowance();
    }
    setIsLoading(false);
  }, [flipInfos, ticketsToBuy, signer]);

  const onBuy = useCallback(async () => {
    setIsLoading(true);
    if (signer && !network.chain?.unsupported) {
      await buy(ticketsToBuy, signer);
      await onGetInfos();
      await onGetBalances();
      await checkAllowance();
    }
    setIsLoading(false);
  }, [ticketsToBuy, signer]);

  const onTogglePause = useCallback(async () => {
    setIsLoading(true);
    if (signer && !network.chain?.unsupported) {
      await togglePause(signer);
      await onGetInfos();
      await onGetBalances();
      await checkAllowance();
    }
    setIsLoading(false);
  }, [signer, network]);

  const onWithdrawLosses = useCallback(async () => {
    setIsLoading(true);
    if (signer && !network.chain?.unsupported) {
      await withdrawLosses(signer);
      await onGetInfos();
      await onGetBalances();
      await checkAllowance();
    }
    setIsLoading(false);
  }, [signer, network]);

  const onWithdraw = useCallback(async () => {
    setIsLoading(true);
    if (signer && !network.chain?.unsupported) {
      await withdraw(signer);
      await onGetInfos();
      await onGetBalances();
      await checkAllowance();
    }
    setIsLoading(false);
  }, [signer, network]);

  const onPlay = useCallback(async () => {
    setIsLoading(true);
    setIsPlaying(true);

    if (signer && !network.chain?.unsupported) {
      const response = await play(side, ticketsToBet, signer);

      setIsWinner(response);
      setIsPlaying(false);

      await onGetInfos();
      await onGetBalances();
      await checkAllowance();
    }
    setIsLoading(false);
  }, [network, side, ticketsToBet, signer, setIsPlaying, setIsWinner]);

  const onClaim = useCallback(async () => {
    setIsLoading(true);

    if (signer && !network.chain?.unsupported) {
      await claim(signer);
      await onGetInfos();
      await onGetBalances();
      await checkAllowance();
    }
    setIsLoading(false);
  }, [network, signer]);

  const onConvertInTickets = useCallback(async () => {
    setIsLoading(true);

    if (signer && !network.chain?.unsupported) {
      await convertIntickets(signer);
      await onGetInfos();
      await onGetBalances();
      await checkAllowance();
    }
    setIsLoading(false);
  }, [network, signer]);

  const onGetInfos = useCallback(async () => {
    setIsLoading(true);
    if (!network.chain?.unsupported && provider) {
      const data: FlipInfos = await getInfos(provider, signer || undefined);
      setFlipInfos(data);
    }

    setIsLoading(false);
  }, [provider, signer]);

  const onGetBalances = useCallback(async () => {
    setIsLoading(true);
    if (signer && !network.chain?.unsupported) {
      const data: Balances = await getBalances(signer);
      setBalances(data);
    }

    setIsLoading(false);
  }, [signer]);

  useEffect(() => {
    if (provider || signer) {
      onGetInfos();
    }

    if (signer) onGetBalances();
  }, [provider, signer]);

  useEffect(() => {
    if (balances && flipInfos) {
      if (
        balances.balance &&
        balances.balance >= ticketsToBuy * flipInfos?.price
      )
        setCanBuy(true);
      if (balances.rewards) setCanClaim(true);
      if (balances.tickets && balances.tickets >= ticketsToBet)
        setCanFlip(true);
    }
  }, [
    flipInfos,
    balances,
    ticketsToBet,
    walletHasAllowance,
    setCanClaim,
    setCanFlip,
  ]);

  const checkAllowance = useCallback(async () => {
    if (signer && !network.chain?.unsupported && flipInfos) {
      const amount = (ticketsToBuy * flipInfos?.price).toString();
      const response = await hasAllowance(amount, signer);

      setWalletHasAllowance(response);
    }
  }, [signer, network, flipInfos, ticketsToBuy, setWalletHasAllowance]);

  useEffect(() => {
    if (signer && ticketsToBuy > 0) checkAllowance();
  }, [signer, ticketsToBuy]);

  useEffect(() => {
    if (flipInfos && address && address === flipInfos.owner) {
      return setIsOwner(true);
    }

    setIsOwner(false);
  }, [flipInfos, address]);

  return (
    <>
      <div className="flex justify-center lg:justify-between w-full mt-4 lg:mt-10 relative">
        <Image
          src="/mark-1.svg"
          alt="Stage 1"
          width={190}
          height={295}
          className="hidden xl:block dark:hue-rotate-[200deg] dark:invert"
        />
        <div className="flex flex-col w-full px-6 sm:px-14 xl:px-0 xl:max-w-[405px] 2xl:max-w-[655px] justify-center items-start z-20">
          {/* TITLE */}
          <div className="flex flex-col text-blue-love dark:text-dark-love leading-[80px] sm:leading-[90px]">
            <p className="flex">
              <span className="font-bold text-[96px] tracking-[-2px]">L</span>
              <span className="font-bold text-[96px] tracking-[-2px] scale-x-[-1] text-blue-love/40 dark:text-dark-love/20 ml-[3px] mr-[-20px]">
                2
              </span>
              <span className="font-bold text-[96px] tracking-[-2px]">2VE</span>
            </p>
            <p className="font-medium text-[38px] xl:text-[44px] 2xl:text-[64px]">
              IS A GAMBLE
            </p>
          </div>

          {/* BOX */}
          <div className="flex flex-col gap-6  font-medium text-[20px] text-blue-love dark:text-dark-love/70 mt-[40px] border rounded-[8px] bg-white/10 dark:bg-dark-love/10 shadow-xl w-full relative">
            <div className="text-xl flex justify-between items-center mb-2 bg-blue-love dark:bg-dark-love text-white py-4 px-10 rounded-t-[8px]">
              BALANCE:{" "}
              <span className="font-bold">
                {Number(balances?.balance || 0).toLocaleString("en-us", {
                  maximumFractionDigits: 2,
                })}{" "}
                L2VE
              </span>
            </div>
            <div className="flex flex-col gap-2 px-10">
              <p className="text-xl flex justify-between items-center">
                TICKET PRICE:{" "}
                <span className="font-bold">
                  {Number(flipInfos?.price || 0).toLocaleString("en-us", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  L2VE
                </span>
              </p>
              <Link
                target="blank"
                href="https://app.uniswap.org/swap?inputCurrency=ETH&outputCurrency=0xA19328fb05ce6FD204D16c2a2A98F7CF434c12F4"
                className="flex items-center justify-center h-[56px] rounded-[10px] shadow-black/25 shadow-md font-semibold text-[14px] tracking-[3px] bg-white dark:bg-[#11151E] text-blue-love dark:text-dark-love px-6 transition-all hover:scale-[1.03] w-full"
              >
                BUY $L2VE
              </Link>
            </div>

            <div className="flex flex-col gap-2 px-10">
              <p className="text-xl flex justify-between items-center">
                MY REWARDS:{" "}
                <span className="font-bold">
                  {Number(balances?.rewards || 0).toLocaleString("en-us", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  L2VE
                </span>
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClaim}
                  disabled={isLoading || !canClaim}
                  className={`flex items-center justify-center h-[56px] rounded-[10px] shadow-black/25 shadow-md font-semibold text-[14px] tracking-[3px] bg-blue-love dark:bg-dark-love text-white px-6 transition-all hover:scale-[1.03]`}
                >
                  CLAIM
                </button>
                <button
                  onClick={onConvertInTickets}
                  disabled={isLoading || !canClaim}
                  className={`flex items-center justify-center h-[56px] rounded-[10px] shadow-black/25 shadow-md font-semibold text-[14px] tracking-[3px] bg-blue-love dark:bg-dark-love text-white px-6 transition-all hover:scale-[1.03] w-full`}
                >
                  CONVERT IN TICKETS
                </button>
              </div>
            </div>

            <div className="flex flex-col w-full relative px-10">
              <p className="text-xl flex justify-between items-center mb-2">
                MY TICKETS:{" "}
                <span className="font-bold">
                  {Number(balances?.tickets || 0).toLocaleString("en-us", {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </p>
              <button
                onClick={walletHasAllowance ? onBuy : onApprove}
                disabled={isLoading || !canBuy}
                className={`flex items-center justify-center h-[56px] rounded-[10px] shadow-black/25 shadow-md font-semibold text-[14px] tracking-[3px] bg-blue-love dark:bg-dark-love text-white px-6 transition-all hover:scale-[1.03] w-full`}
              >
                {walletHasAllowance ? "BUY" : "APPROVE"}
                <span
                  className={`${walletHasAllowance ? "hidden" : "block"} ml-2`}
                >
                  {flipInfos ? ticketsToBuy * flipInfos?.price : 0} L2VE for{" "}
                  {ticketsToBuy} {ticketsToBuy === 1 ? "TICKET" : "TICKETS"}
                </span>
                <span
                  className={`${walletHasAllowance ? "block" : "hidden"} ml-2`}
                >
                  {ticketsToBuy} {ticketsToBuy === 1 ? "TICKET" : "TICKETS"} for{" "}
                  {flipInfos ? ticketsToBuy * flipInfos?.price : 0} L2VE
                </span>
              </button>

              <button
                onClick={() =>
                  ticketsToBuy > 1 && setTicketsToBuy(ticketsToBuy - 1)
                }
                className="flex justify-center items-center bg-white p-4 rounded-full shadow-2xl w-8 h-8 text-2xl transition-all hover:scale-[1.03] hover:opacity-80 absolute top-12 left-14"
              >
                -
              </button>

              <button
                onClick={() => setTicketsToBuy(ticketsToBuy + 1)}
                className="flex justify-center items-center bg-white p-4 rounded-full shadow-2xl w-8 h-8 text-2xl transition-all hover:scale-[1.03] hover:opacity-80 absolute top-12 right-14"
              >
                +
              </button>
            </div>

            <div className="flex flex-col w-full mt-4 bg-blue-love/20 dark:bg-black/30 p-10">
              <div className="flex items-center justify-between mb-4 bg-white/40 dark:bg-black/30 px-4 py-3 gap-3 rounded-[10px]">
                <button
                  onClick={() => setSide(true)}
                  className={`font-semibold text-[14px] tracking-[3px] text-center ${
                    side === true
                      ? "bg-blue-love dark:bg-dark-love text-white"
                      : "bg-white text-blue-love dark:text-dark-love"
                  } p-2 px-4 rounded-[10px] shadow-xl w-full transition-all hover:scale-[1.03]`}
                >
                  HEAD
                </button>
                <button
                  onClick={() => setSide(false)}
                  className={`font-semibold text-[14px] tracking-[3px] text-center ${
                    side === false
                      ? "bg-blue-love dark:bg-dark-love text-white"
                      : "bg-white text-blue-love dark:text-dark-love"
                  } p-2 px-4 rounded-[10px] shadow-xl w-full transition-all hover:scale-[1.03]`}
                >
                  TAILS
                </button>
              </div>

              <div className="flex flex-col w-full relative">
                <button
                  disabled={isLoading || !canFlip}
                  onClick={onPlay}
                  className={`flex items-center justify-center h-[56px] rounded-[10px] shadow-black/25 shadow-md font-semibold text-[14px] tracking-[3px] bg-red-500 text-white px-6 transition-all hover:scale-[1.03] w-full `}
                >
                  BET {ticketsToBet} {ticketsToBet === 1 ? "TICKET" : "TICKETS"}{" "}
                  AND FLIP
                </button>
                <button
                  onClick={() =>
                    ticketsToBet > 1 && setTicketsToBet(ticketsToBet - 1)
                  }
                  className="flex justify-center items-center bg-white p-4 rounded-full shadow-2xl w-8 h-8 text-2xl transition-all hover:scale-[1.03] hover:opacity-80 absolute top-3 left-4"
                >
                  -
                </button>

                <button
                  onClick={() => setTicketsToBet(ticketsToBet + 1)}
                  className="flex justify-center items-center bg-white p-4 rounded-full shadow-2xl w-8 h-8 text-2xl transition-all hover:scale-[1.03] hover:opacity-80 absolute top-3 right-4"
                >
                  +
                </button>
              </div>
            </div>

            <div
              className={`${
                isLoading ? "flex" : "hidden"
              } flex-col justify-center items-center rounded-[8px] py-10 bg-dark-love/70 backdrop-blur-sm dark:bg-dark-love/10 shadow-xl w-full h-full absolute top-0 left-0`}
            >
              <Image
                src="/heart-blue.svg"
                alt="Stage 1"
                width={190}
                height={295}
                className="animation-heart dark:hue-rotate-30"
              />
            </div>
          </div>
        </div>
        <Image
          src="/mascout2.svg"
          alt="Mascout"
          width={592}
          height={775}
          className="hidden lg:block dark:hue-rotate-[15deg]"
        />
        <Image
          src="/mascout2.svg"
          alt="Mascout"
          width={592}
          height={775}
          className="absolute top-0 right-0 lg:hidden z-0 opacity-20 dark:hue-rotate-[15deg]"
        />
        <div
          className={`flex flex-col justify-center items-center absolute top-[240px] right-[400px] ${
            isPlaying ? "coinFlip" : "animate-bounce"
          }`}
        >
          {isPlaying
            ? theme === Theme.light
              ? coinflip
              : coinflipDark
            : side
            ? theme === Theme.light
              ? head
              : headDark
            : theme === Theme.light
            ? tails
            : tailsDark}

          <div
            className={`absolute top-[140px] left-0 w-[210px] justify-center font-bold ${
              isPlaying ? "hidden" : "flex"
            } ${
              isWinner
                ? "text-green-600 dark:text-green-300"
                : "text-red-500 dark:text-red-200"
            }`}
          >
            {isWinner === null ? "" : isWinner ? "YOU WIN!" : "YOU LOSE!"}
          </div>
        </div>
      </div>

      <div
        className={`${
          isOwner ? "flex" : "hidden"
        } flex-col items-center justify-center gap-4 w-full mt-10 lg:mt-10 relative bg-blue-love p-10`}
      >
        <p className="font-medium text-[38px] xl:text-[44px] 2xl:text-[64px] text-white">
          MANAGER
        </p>
        <div className="flex justify-center gap-10 bg-blue-love p-10">
          <button
            disabled={isLoading}
            onClick={onTogglePause}
            className={`flex items-center justify-center h-[56px] rounded-[10px] shadow-black/25 shadow-md font-semibold text-[14px] tracking-[3px] bg-white text-blue-love px-6 transition-all hover:scale-[1.03] w-max`}
          >
            {flipInfos?.paused ? "UNPAUSE" : "PAUSE"}
          </button>
          <button
            disabled={isLoading}
            onClick={onWithdrawLosses}
            className={`flex items-center justify-center h-[56px] rounded-[10px] shadow-black/25 shadow-md font-semibold text-[14px] tracking-[3px] bg-white text-blue-love px-6 transition-all hover:scale-[1.03] w-max`}
          >
            WITHDRAW LOSSES{" "}
            {balances?.accumulatedLosses.toLocaleString("en-us", {
              maximumFractionDigits: 2,
            })}{" "}
            IN L2VE
          </button>

          <button
            disabled={isLoading}
            onClick={onWithdraw}
            className={`flex items-center justify-center h-[56px] rounded-[10px] shadow-black/25 shadow-md font-semibold text-[14px] tracking-[3px] bg-red-500 text-white px-6 transition-all hover:scale-[1.03] w-max`}
          >
            RUG{" "}
            {balances?.contractBalance.toLocaleString("en-us", {
              maximumFractionDigits: 2,
            })}
            {" L2VE "}
            AND PAUSE{" "}
          </button>
        </div>
      </div>
    </>
  );
}
