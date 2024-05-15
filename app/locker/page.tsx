"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import Nav from "../components/v2/nav";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Carousel, Datepicker } from "flowbite-react";
import { StateContext } from "../context/StateContext";
import { useNetwork } from "wagmi";
import { TokenInfos, empty, tokenInfos } from "../contracts/tokenInfos";
import { format, getUnixTime, fromUnixTime, parse } from "date-fns";
import {
  Event,
  getAllEvents,
  handleApproval,
  hasAllowance,
  lock,
  unlock,
} from "../contracts/locker";
import { CustomConnectButtonV3 } from "../components/connectButtonV3";

export default function Locker() {
  const [loading, setLoading] = useState(false);
  const [inputToken, setInputToken] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [inputDate, setInputDate] = useState<Date>(new Date());
  const [inputTime, setInputTime] = useState("00:00");
  const [timestamp, setTimestamp] = useState(0);
  const [loadedToken, setLoadedToken] = useState<TokenInfos>(empty);
  const [allowed, setAllowed] = useState(false);
  const [events, setEvents] = useState<Event[] | []>([]);

  const { signer } = useContext(StateContext);
  const { chain } = useNetwork();

  const customTheme: CustomFlowbiteTheme["datepicker"] = {
    root: {
      base: "relative",
    },
    popup: {
      root: {
        base: "absolute top-10 z-50 block pt-2",
        inline: "relative top-0 z-auto",
        inner:
          "inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700",
      },
      header: {
        base: "",
        title:
          "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
        selectors: {
          base: "mb-2 flex justify-between",
          button: {
            base: "rounded-lg bg-white px-5 py-2.5 font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
            prev: "",
            next: "",
            view: "",
          },
        },
      },
      view: {
        base: "p-1",
      },
      footer: {
        base: "mt-2 flex space-x-2",
        button: {
          base: "w-full rounded-lg px-5 py-2 text-center font-medium focus:ring-4 focus:ring-blue-love",
          today:
            "bg-blue-love text-white hover:bg-blue-love dark:bg-cyan-600 dark:hover:bg-blue-love",
          clear:
            "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
        },
      },
    },
    views: {
      days: {
        header: {
          base: "mb-1 grid grid-cols-7",
          title:
            "h-6 text-center font-medium leading-6 text-gray-500 dark:text-gray-400",
        },
        items: {
          base: "grid w-64 grid-cols-7",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 ",
            selected: "bg-blue-love text-white hover:bg-blue-love/80",
            disabled: "text-gray-500",
          },
        },
      },
      months: {
        items: {
          base: "grid w-64 grid-cols-4",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
            selected: "bg-blue-love text-white hover:bg-blue-love/80",
            disabled: "text-gray-500",
          },
        },
      },
      years: {
        items: {
          base: "grid w-64 grid-cols-4",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
            selected: "bg-blue-love text-white hover:bg-blue-love/80",
            disabled: "text-gray-500",
          },
        },
      },
      decades: {
        items: {
          base: "grid w-64 grid-cols-4",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center font-semibold leading-9  text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
            selected: "bg-blue-love text-white hover:bg-blue-love/80",
            disabled: "text-gray-500",
          },
        },
      },
    },
  };

  const carouselTheme: CustomFlowbiteTheme["carousel"] = {
    root: {
      base: "relative h-full w-full",
      leftControl:
        "absolute left-[-20px] top-0 flex h-full items-center justify-center px-4 focus:outline-none",
      rightControl:
        "absolute right-[-20px] top-0 flex h-full items-center justify-center px-4 focus:outline-none",
    },
    indicators: {
      active: {
        off: "bg-black/10 hover:bg-black dark:bg-gray-800/50 dark:hover:bg-gray-800",
        on: "bg-black/80 dark:bg-gray-800",
      },
      base: "h-3 w-3 rounded-full",
      wrapper:
        "absolute bottom-[-30px] left-1/2 flex -translate-x-1/2 space-x-3",
    },
    item: {
      base: "absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
      wrapper: {
        off: "w-full flex-shrink-0 transform cursor-default snap-center",
        on: "w-full flex-shrink-0 transform cursor-grab snap-center",
      },
    },
    control: {
      base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/30 scale-[0.6] group-hover:bg-black/80 group-focus:outline-none group-focus:ring-0 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
      icon: "h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6 scale-[0.8]",
    },
    scrollContainer: {
      base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth",
      snap: "snap-x",
    },
  };

  const onInputAmountChange = (value: string) => {
    const re = new RegExp("^[+]?([0-9]+([.][0-9]*)?|[.][0-9]+)$");

    if (value === "" || re.test(value)) {
      setInputAmount(value);
    }

    return false;
  };

  const onLoadToken = useCallback(async () => {
    setLoading(true);
    if (signer && inputToken) {
      const tokenData = await tokenInfos(signer, inputToken);
      setLoadedToken(tokenData);
    }
    setLoading(false);
  }, [chain, inputToken, signer, setLoading]);

  const onApprove = useCallback(async () => {
    setLoading(true);
    if (signer && loadedToken) {
      await handleApproval(
        inputToken,
        loadedToken.decimals,
        inputAmount,
        signer
      );
      await onCheckAllowance();
    }
    setLoading(false);
  }, [chain, signer, inputToken, inputAmount, loadedToken, setLoading]);

  const onCheckAllowance = useCallback(async () => {
    if (signer && loadedToken) {
      const allowance = await hasAllowance(
        inputToken,
        loadedToken.decimals,
        inputAmount,
        signer
      );

      return setAllowed(allowance);
    }

    return setAllowed(false);
  }, [chain, signer, inputToken, inputAmount, loadedToken]);

  const onLock = useCallback(async () => {
    setLoading(true);
    if (chain && !chain.unsupported && signer) {
      await lock(
        inputToken,
        loadedToken.decimals,
        inputAmount,
        timestamp,
        signer
      );
      await onCheckAllowance();
      await getEvents();
    }

    setLoading(false);
  }, [
    chain,
    signer,
    inputToken,
    loadedToken,
    inputAmount,
    timestamp,
    setLoading,
  ]);

  const onUnlock = useCallback(
    async (event: Event) => {
      setLoading(true);
      if (chain && !chain.unsupported && signer) {
        await unlock(event.lockData.token, event.lockData.id, signer);
        await getEvents();
      }

      setLoading(false);
    },
    [chain, signer, inputToken, loadedToken, inputAmount, inputDate, setLoading]
  );

  useEffect(() => {
    if (inputAmount !== "" && Number(inputAmount) > 0) {
      onCheckAllowance();
    }
  }, [inputAmount]);

  const getEvents = useCallback(async () => {
    if (chain && !chain.unsupported && signer) {
      const response: Event[] = await getAllEvents(signer);
      setEvents(response);
    }
  }, [chain, signer]);

  useEffect(() => {
    if (chain && !chain.unsupported && signer) {
      getEvents();
    }
  }, [chain, signer]);

  useEffect(() => {
    const parsedTime = parse(inputTime, "HH:mm", inputDate);
    setTimestamp(getUnixTime(parsedTime));
  }, [inputDate, inputTime, setTimestamp]);

  return (
    <>
      <Nav />

      <div className="flex flex-col relative min-h-[700px]">
        <div className="flex justify-center items-center w-full text-gray-900 pt-10">
          <CustomConnectButtonV3 />
        </div>
        <div className="flex justify-center items-center w-full max-w-[500px] text-gray-900 self-center mt-20 text-lg gap-2">
          LOCK ANY TOKEN WITH{" "}
          <span className="text-blue-love">L2VE LOCKER</span>
        </div>
        <div className="flex flex-col w-full max-w-[500px] gap-2 p-6 bg-gray-900 text-white self-center mt-5">
          <p>L2VE LOCKER</p>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="FILL THE DESIRED TOKEN ADDRESS"
              className="w-full text-black"
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
            />
            <button
              type="button"
              className={`inline-flex justify-center items-center w-[131px] h-[43.5px] rounded-md bg-blue-love text-[18px]  text-[#F0EFEF] focus:outline-none focus-visible:ring-0 hover:opacity-80`}
              onClick={onLoadToken}
            >
              LOAD
            </button>
          </div>
          {!loadedToken.empty && loadedToken.valid && (
            <div className="flex items-center justify-between">
              <p>TOKEN: {loadedToken.symbol.toUpperCase()}</p>
              <p>BALANCE: {loadedToken.balance.toLocaleString("en-us")}</p>
            </div>
          )}

          {!loadedToken.empty && !loadedToken.valid && (
            <div className="flex items-center justify-between text-red-600">
              <p>TOKEN: {inputToken.toUpperCase()} IS INVALID!</p>
            </div>
          )}
          <input
            disabled={
              loading ||
              loadedToken.empty ||
              !loadedToken.valid ||
              loadedToken.balance === 0
            }
            type="text"
            placeholder="FILL THE AMOUNT TO LOCK"
            className={`w-full text-black ${
              loading ||
              loadedToken.empty ||
              !loadedToken.valid ||
              loadedToken.balance === 0
                ? "opacity-50"
                : "opacity-100"
            }`}
            value={inputAmount}
            onChange={(e) => onInputAmountChange(e.target.value)}
          />

          <div className="flex items-center gap-3">
            {/* DATE PICKER */}
            <Datepicker
              disabled={
                loading ||
                loadedToken.balance === 0 ||
                Number(inputAmount) === 0 ||
                Number(inputAmount) > loadedToken.balance
              }
              className="input-no-rounded w-full"
              value={format(inputDate, "dd/MM/yyyy")}
              onSelectedDateChanged={(e) => setInputDate(e)}
              theme={customTheme}
            />
            {/* TIME PICKER */}
            <div
              className={`relative ${
                loading ||
                loadedToken.balance === 0 ||
                Number(inputAmount) === 0 ||
                Number(inputAmount) > loadedToken.balance
                  ? "opacity-50"
                  : "opacity-100"
              }`}
            >
              <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="time"
                id="time"
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-love block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-love dark:focus:border-blue-love w-[100px]"
                min="09:00"
                max="18:00"
                value={inputTime}
                onChange={(e) => setInputTime(e.target.value)}
                required
                disabled={
                  loading ||
                  loadedToken.balance === 0 ||
                  Number(inputAmount) === 0 ||
                  Number(inputAmount) > loadedToken.balance
                }
              />
            </div>
          </div>

          <button
            disabled={
              loading ||
              loadedToken.balance === 0 ||
              Number(inputAmount) === 0 ||
              Number(inputAmount) > loadedToken.balance
            }
            type="button"
            className={`inline-flex justify-center items-center h-[43.5px] rounded-md bg-blue-love text-[18px]  text-[#F0EFEF] focus:outline-none focus-visible:ring-0 w-full enabled:hover:opacity-80 ${
              loading ||
              loadedToken.balance === 0 ||
              Number(inputAmount) === 0 ||
              Number(inputAmount) > loadedToken.balance
                ? "opacity-20"
                : "opacity-100"
            }`}
            onClick={allowed ? onLock : onApprove}
          >
            {loading ? "LOADING..." : allowed ? "LOCK" : "APPROVE"}
          </button>
        </div>

        {events.length > 0 && (
          <div className="flex flex-col w-full max-w-[500px] gap-4 text-gray-900 self-center mt-10">
            <div className="flex justify-center items-center w-full  self-center text-lg gap-2">
              MANAGE YOUR LOCKS
            </div>

            <div className="h-44">
              <Carousel slide={false} theme={carouselTheme}>
                {events.map((event: Event, index: number) => (
                  <div key={index} className="flex px-12 h-44">
                    <div className="flex flex-col gap-1 py-6">
                      <p className="font-bold underline">
                        {event.lockData.symbol}: {event.lockData.token}
                      </p>

                      <div className="flex justify-between items-center">
                        <div>
                          <p>
                            Locked at:{" "}
                            {format(
                              fromUnixTime(event.lockData.lockedAt),
                              "dd/MM/yyyy - HH:mm"
                            )}
                          </p>
                          <p>
                            Locked until:{" "}
                            {format(
                              fromUnixTime(event.lockData.lockedUntil),
                              "dd/MM/yyyy - HH:mm"
                            )}
                          </p>
                          {event.lockData.unlockedAt > 0 && (
                            <p>
                              Unlocked at:{" "}
                              {format(
                                fromUnixTime(event.lockData.unlockedAt),
                                "dd/MM/yyyy - HH:mm"
                              )}
                            </p>
                          )}
                          <p>
                            Amount:{" "}
                            {event.lockData.amount.toLocaleString("en-us")}
                          </p>
                        </div>
                        <button
                          onClick={() => onUnlock(event)}
                          className={`${
                            event.lockData.unlockedAt > 0 ||
                            getUnixTime(new Date()) < event.lockData.lockedUntil
                              ? "hidden"
                              : "inline-flex"
                          }  justify-center items-center h-[33.5px] rounded-md bg-blue-love text-[16px] text-[#F0EFEF] focus:outline-none focus-visible:ring-0 px-6 hover:opacity-80 ${
                            loading ? "opacity-20" : "opacity-100"
                          }`}
                        >
                          {loading ? "LOADING..." : "UNLOCK"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
            {/* <div className="flex flex-col w-full max-h-[400px] gap-4 overflow-y-scroll">
            {events.map((event: Event, index: number) => (
              <div
                key={index}
                className="flex justify-between items-center gap-2 bg-white/20 px-6"
              >
                <div className="flex flex-col gap-1 py-6">
                  <p>
                    {event.lockData.symbol}: {event.lockData.token}
                  </p>
                  <p>
                    Locked at:{" "}
                    {format(
                      fromUnixTime(event.lockData.lockedAt),
                      "dd/MM/yyyy - HH:mm"
                    )}
                  </p>
                  <p>
                    Locked until:{" "}
                    {format(
                      fromUnixTime(event.lockData.lockedUntil),
                      "dd/MM/yyyy - HH:mm"
                    )}
                  </p>
                  {event.lockData.unlockedAt > 0 && (
                    <p>
                      Unocked at:{" "}
                      {format(
                        fromUnixTime(event.lockData.unlockedAt),
                        "dd/MM/yyyy - HH:mm"
                      )}
                    </p>
                  )}
                  <p>Amount: {event.lockData.amount.toLocaleString("en-us")}</p>
                </div>
                <button
                  onClick={() => onUnlock(event)}
                  className={`${
                    event.lockData.unlockedAt > 0 ||
                    getUnixTime(new Date()) < event.lockData.lockedUntil
                      ? "hidden"
                      : "inline-flex"
                  }  justify-center items-center h-[33.5px] rounded-md bg-blue-love text-[16px] text-[#F0EFEF] focus:outline-none focus-visible:ring-0 px-6 hover:opacity-80`}
                >
                  UNLOCK
                </button>
              </div>
            ))}
          </div> */}
          </div>
        )}
        {/* COPYRIGHTS */}
        <span className="absolute bottom-[340px] lg:bottom-[140px] left-[-40px] lg:left-0 -rotate-90 text-black text-[12px]">
          2024® ALL RIGHTS RESERVED
        </span>
      </div>
    </>
  );
}
