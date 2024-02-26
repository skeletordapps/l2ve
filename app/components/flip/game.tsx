"use client";
import { StateContext } from "@/app/context/StateContext";
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
import { coinflip, head, tails } from "@/public/svgs";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNetwork, useAccount } from "wagmi";
import { Tooltip, Button } from "flowbite-react";

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
  const [coin, setCoin] = useState<JSX.Element>(head);
  const { provider, signer } = useContext(StateContext);

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
  }, [network, flipInfos, ticketsToBuy, signer]);

  const onBuy = useCallback(async () => {
    setIsLoading(true);
    if (signer && !network.chain?.unsupported) {
      await buy(ticketsToBuy, signer);
      await onGetInfos();
      await onGetBalances();
      await checkAllowance();
    }
    setIsLoading(false);
  }, [network, ticketsToBuy, signer]);

  const onTogglePause = useCallback(async () => {
    setIsLoading(true);
    if (signer && !network.chain?.unsupported) {
      await togglePause(signer);
      await onGetInfos();
      await onGetBalances();
      await checkAllowance();
    }
    setIsLoading(false);
  }, [signer, network, setIsLoading]);

  const onWithdrawLosses = useCallback(async () => {
    setIsLoading(true);
    if (signer && !network.chain?.unsupported) {
      await withdrawLosses(signer);
      await onGetInfos();
      await onGetBalances();
      await checkAllowance();
    }
    setIsLoading(false);
  }, [signer, network, setIsLoading]);

  const onWithdraw = useCallback(async () => {
    setIsLoading(true);
    if (signer && !network.chain?.unsupported) {
      await withdraw(signer);
      await onGetInfos();
      await onGetBalances();
      await checkAllowance();
    }
    setIsLoading(false);
  }, [signer, network, setIsLoading]);

  const onPlay = useCallback(async () => {
    setIsLoading(true);
    if (signer && !network.chain?.unsupported) {
      setIsPlaying(true);

      const response = await play(side, ticketsToBet, signer);
      setIsWinner(response);
      setIsPlaying(false);
      if (!response) setSide(!side);

      await onGetInfos();
      await onGetBalances();
      await checkAllowance();
    }
    setIsLoading(false);
  }, [
    network,
    side,
    ticketsToBet,
    signer,
    setIsPlaying,
    setIsWinner,
    setSide,
    setIsLoading,
  ]);

  const onClaim = useCallback(async () => {
    setIsLoading(true);

    if (signer && !network.chain?.unsupported) {
      await claim(signer);
      await onGetInfos();
      await onGetBalances();
      await checkAllowance();
    }
    setIsLoading(false);
  }, [network, signer, setIsLoading]);

  const onConvertInTickets = useCallback(async () => {
    setIsLoading(true);

    if (signer && !network.chain?.unsupported) {
      await convertIntickets(signer);
      await onGetInfos();
      await onGetBalances();
      await checkAllowance();
    }
    setIsLoading(false);
  }, [network, signer, setIsLoading]);

  const onGetInfos = useCallback(async () => {
    setIsLoading(true);
    if (!network.chain?.unsupported && provider) {
      const data: FlipInfos = await getInfos(provider, signer || undefined);
      setFlipInfos(data);
    }

    setIsLoading(false);
  }, [provider, signer, network, setIsLoading, setFlipInfos]);

  const onGetBalances = useCallback(async () => {
    setIsLoading(true);
    if (signer && !network.chain?.unsupported) {
      const data: Balances = await getBalances(signer);
      setBalances(data);
    }

    setIsLoading(false);
  }, [signer, network, setIsLoading, setBalances]);

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
      ) {
        setCanBuy(true);
      } else {
        setCanBuy(false);
      }
      if (balances.rewards) setCanClaim(true);
      if (balances.tickets && balances.tickets >= ticketsToBet)
        setCanFlip(true);
    }
  }, [
    flipInfos,
    balances,
    ticketsToBet,
    ticketsToBuy,
    walletHasAllowance,
    setCanBuy,
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

  useEffect(() => {
    setCoin(isPlaying ? coinflip : side ? head : tails);
  }, [side, isPlaying, setCoin]);

  return (
    <>
      <div className="flex justify-center lg:justify-between w-full mt-4 lg:mt-10 relative">
        <Image
          src="/mark-1.svg"
          alt="Stage 1"
          width={190}
          height={295}
          className="hidden 2xl:block dark:hue-rotate-[200deg] dark:invert"
        />
        <div className="flex flex-col w-full px-6 sm:px-14 xl:px-0 xl:max-w-[405px] 2xl:max-w-[665px] justify-center items-start z-20">
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
          <div className="flex flex-col gap-6 font-medium text-[20px] text-blue-love dark:text-dark-love/70 mt-[40px] border dark:border-dark-love/50 rounded-[20px] bg-white/40 dark:bg-dark-love/10 shadow-xl w-full relative pb-10">
            <div className="flex justify-between items-center gap-10 bg-blue-love dark:bg-dark-love p-8 px-[55px] rounded-t-[20px]">
              <div className="flex flex-col items-center text-white/50 dark:text-white/70 text-[22px]">
                BALANCE
                <span className="font-bold text-2xl text-white">
                  {Number(balances?.balance || 0).toLocaleString("en-us", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  L2VE
                </span>
              </div>
              <div className="flex flex-col items-center text-white/50 dark:text-white/70 text-[22px]">
                TICKETS
                <span className="font-bold text-2xl text-white">
                  {Number(balances?.tickets || 0).toLocaleString("en-us", {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex flex-col items-center text-white/50 dark:text-white/70 text-[22px]">
                REWARDS
                <span className="font-bold text-2xl text-white">
                  {Number(balances?.rewards || 0).toLocaleString("en-us", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  L2VE
                </span>
              </div>
            </div>
            <div className="flex gap-10 justify-between items-center w-full px-10">
              <span className="text-7xl w-[50px] text-blue-love/40 dark:text-dark-love text-center">
                1
              </span>
              <div className="flex justify-between items-center w-full p-6 rounded-[20px] bg-white/50 dark:bg-black/60 gap-10">
                <p>
                  GET SOME <span className="font-bold">L2VE</span> TO PLAY
                </p>
                <Link
                  target="blank"
                  href="https://app.uniswap.org/swap?inputCurrency=ETH&outputCurrency=0xA19328fb05ce6FD204D16c2a2A98F7CF434c12F4"
                  className={`flex items-center justify-center text-[14px] py-2 rounded-full shadow-black/25 shadow-md font-semibold bg-white dark:bg-dark-love text-blue-love dark:text-white px-12 transition-all hover:scale-[1.03]`}
                >
                  BUY
                </Link>
              </div>
            </div>

            <div className="flex gap-10 justify-between items-center w-full px-10">
              <span className="text-7xl w-[50px] text-blue-love/40 dark:text-dark-love text-center">
                2
              </span>
              <div className="flex justify-between items-center w-full p-6 rounded-[20px] bg-white/50 dark:bg-black/60 gap-10 relative">
                <div className="flex items-center gap-2">
                  GET TICKETS{" "}
                  <Tooltip
                    content={`Ticket Price: ${flipInfos?.price.toLocaleString(
                      "en-us",
                      { maximumFractionDigits: 2 }
                    )} L2VE`}
                  >
                    <div className="w-6 h-6">
                      <svg
                        data-slot="icon"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                        ></path>
                      </svg>
                    </div>
                  </Tooltip>
                </div>

                {/* <span className="absolute top-14 left-6 text-xs text-blue-love/50">
                  Ticket Price:{" "}
                  {(flipInfos?.price || 0).toLocaleString("en-us", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  L2VE
                </span> */}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      ticketsToBuy > 1 && setTicketsToBuy(ticketsToBuy - 1)
                    }
                    className="flex justify-center items-center text-blue-love dark:text-dark-love rounded-full shadow-2xl w-8 h-8 text-2xl transition-all hover:scale-[1.03] hover:opacity-80"
                  >
                    <svg
                      data-slot="icon"
                      fill="none"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    onClick={walletHasAllowance ? onBuy : onApprove}
                    disabled={isLoading || !canBuy}
                    className={`flex items-center justify-center text-[14px] py-2 rounded-full shadow-black/25 shadow-md font-semibold bg-blue-love dark:bg-dark-love text-white px-6 transition-all hover:scale-[1.03]`}
                  >
                    {walletHasAllowance ? "BUY" : "APPROVE"}
                    <span className="ml-2">
                      {ticketsToBuy} {ticketsToBuy === 1 ? "TICKET" : "TICKETS"}
                    </span>
                  </button>
                  <button
                    onClick={() =>
                      flipInfos &&
                      balances &&
                      balances.balance >= ticketsToBuy * flipInfos?.price &&
                      setTicketsToBuy(ticketsToBuy + 1)
                    }
                    className="flex justify-center items-center text-blue-love dark:text-dark-love rounded-full shadow-2xl w-8 h-8 text-2xl transition-all hover:scale-[1.03] hover:opacity-80"
                  >
                    <svg
                      data-slot="icon"
                      fill="none"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-10 justify-between items-center w-full px-10">
              <span className="text-7xl w-[50px] text-blue-love/40 dark:text-dark-love text-center">
                3
              </span>
              <div className="flex justify-between items-center w-full p-6 rounded-[20px] bg-white/50 dark:bg-black/60 gap-10">
                <span>FLIP IT</span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={isLoading}
                    onClick={() =>
                      ticketsToBet > 1 && setTicketsToBet(ticketsToBet - 1)
                    }
                    className="flex justify-center items-center text-[#FF0000] dark:text-red-400 rounded-full shadow-2xl w-8 h-8 text-2xl transition-all hover:scale-[1.03] hover:opacity-80"
                  >
                    <svg
                      data-slot="icon"
                      fill="none"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    disabled={isLoading || !canFlip}
                    onClick={onPlay}
                    className={`flex items-center justify-center text-[14px] py-2 rounded-full shadow-black/25 shadow-md font-semibold bg-[#FF0000] dark:bg-red-400 text-white px-6 transition-all hover:scale-[1.03]`}
                  >
                    <span
                      className={`${
                        walletHasAllowance ? "hidden" : "block"
                      } ml-2`}
                    >
                      BET {ticketsToBet}{" "}
                      {ticketsToBet === 1 ? "TICKET" : "TICKETS"} AND FLIP
                    </span>
                    <span
                      className={`${
                        walletHasAllowance ? "block" : "hidden"
                      } ml-2`}
                    >
                      {ticketsToBuy} {ticketsToBuy === 1 ? "TICKET" : "TICKETS"}{" "}
                      for {flipInfos ? ticketsToBuy * flipInfos?.price : 0} L2VE
                    </span>
                  </button>

                  <button
                    disabled={isLoading}
                    onClick={() =>
                      balances &&
                      balances.tickets >= ticketsToBet + 1 &&
                      setTicketsToBet(ticketsToBet + 1)
                    }
                    className="flex justify-center items-center text-[#FF0000] dark:text-red-400 rounded-full shadow-2xl w-8 h-8 text-2xl transition-all hover:scale-[1.03] hover:opacity-80"
                  >
                    <svg
                      data-slot="icon"
                      fill="none"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-10 justify-between items-center w-full px-10">
              <span className="text-7xl w-[50px] text-blue-love/40 dark:text-dark-love text-center">
                4
              </span>
              <div className="flex justify-between items-center w-full p-6 rounded-[20px] bg-white/50 dark:bg-black/60 gap-10">
                <span>CLAIM</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onClaim}
                    disabled={isLoading || !canClaim}
                    className={`flex items-center justify-center text-[14px] py-2 rounded-full shadow-black/25 shadow-md font-semibold bg-blue-love dark:bg-dark-love text-white px-6 transition-all hover:scale-[1.03]`}
                  >
                    CLAIM
                  </button>
                  <button
                    onClick={onConvertInTickets}
                    disabled={isLoading || !canClaim}
                    className={`flex items-center justify-center text-[14px] py-2 rounded-full shadow-black/25 shadow-md font-semibold text-blue-love dark:text-white bg-white dark:bg-dark-love/50 px-6 transition-all hover:scale-[1.03]`}
                  >
                    CONVERT IN TICKETS
                  </button>
                </div>
              </div>
            </div>

            {/* WIN OR LOSE */}
            {isWinner !== null && (
              <div className="absolute top-0-left-0 flex flex-col justify-center items-center w-full h-full bg-white/70 rounded-[20px]">
                <Image
                  src={isWinner ? "/win.png" : "/lose.png"}
                  alt="you win"
                  width={330}
                  height={331}
                />
                <div className="flex flex-col bg-white justify-center items-center py-4 px-16 rounded-[20px] border-2 border-blue-love mt-[-40px]">
                  <span className="font-bold text-6xl">
                    {isWinner ? "YOU WIN" : "YOU LOSE"}
                  </span>
                  <span>{isWinner ? "FUCKING LEGEND" : "MCDONALD'S NEXT"}</span>
                  <button
                    onClick={() => setIsWinner(null)}
                    className={`flex items-center justify-center text-[14px] py-2 rounded-full shadow-black/25 shadow-md font-semibold bg-[#FF0000] dark:bg-dark-love text-white px-6 transition-all hover:scale-[1.03] mt-3`}
                  >
                    FLIP AGAIN
                  </button>
                </div>
              </div>
            )}
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
        <button
          onClick={() => setSide(!side)}
          className={`flex flex-col justify-center items-center absolute top-[210px] right-[400px] ${
            isPlaying ? "coinFlip" : "animate-bounce"
          }`}
        >
          {coin}
        </button>
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
