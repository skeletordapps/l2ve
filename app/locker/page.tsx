"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Carousel, Datepicker } from "flowbite-react";
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

import { StateContext } from "../context/StateContext";
import Image from "next/image";

export default function Locker() {
  enum LockStatus {
    todo,
    progress,
    done,
  }

  const [loading, setLoading] = useState(false);
  const [inputToken, setInputToken] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [inputDate, setInputDate] = useState<Date>(new Date());
  const [inputTime, setInputTime] = useState(format(new Date(), "HH:mm"));
  const [timestamp, setTimestamp] = useState(0);
  const [loadedToken, setLoadedToken] = useState<TokenInfos>(empty);
  const [allowed, setAllowed] = useState(false);
  const [locked, setLocked] = useState(false);
  const [events, setEvents] = useState<Event[] | []>([]);

  const { signer, account } = useContext(StateContext);

  const steps = [
    {
      text: "CONNECT WALLET",
      image: account ? "open-done.svg" : "open-todo.svg",
      status: account ? LockStatus.done : LockStatus.todo,
    },
    {
      text: "",
      image: account ? "arrow-done.svg" : "arrow-inactive.svg",
      status: LockStatus.todo,
    },
    {
      text: "ENTER TOKEN ADDRESS",
      image: loadedToken.valid
        ? "open-done.svg"
        : account
        ? "open-current.svg"
        : "open-todo.svg",
      status: loadedToken.valid
        ? LockStatus.done
        : account
        ? LockStatus.progress
        : LockStatus.todo,
    },
    {
      text: "",
      image: loadedToken.valid
        ? "arrow-done.svg"
        : account
        ? "arrow-active.svg"
        : "arrow-inactive.svg",
      status: LockStatus.todo,
    },
    {
      text: "ADD LOCK DETAILS",
      image:
        Number(inputAmount) > 0 && Number(inputAmount) <= loadedToken.balance
          ? "open-done.svg"
          : loadedToken.valid
          ? "open-current.svg"
          : "open-todo.svg",
      status:
        Number(inputAmount) > 0 && Number(inputAmount) <= loadedToken.balance
          ? LockStatus.done
          : loadedToken.valid
          ? LockStatus.progress
          : LockStatus.todo,
    },
    {
      text: "",
      image:
        Number(inputAmount) > 0 && Number(inputAmount) <= loadedToken.balance
          ? "arrow-done.svg"
          : loadedToken.valid
          ? "arrow-active.svg"
          : "arrow-inactive.svg",
      status: LockStatus.todo,
    },
    {
      text: "TOKEN LOCKED",
      image: locked
        ? "closed-done.svg"
        : Number(inputAmount) > 0 &&
          Number(inputAmount) <= loadedToken.balance &&
          inputDate &&
          inputTime
        ? "closed-current.svg"
        : "closed-todo.svg",
      status: locked
        ? LockStatus.done
        : Number(inputAmount) > 0 &&
          Number(inputAmount) <= loadedToken.balance &&
          inputDate &&
          inputTime
        ? LockStatus.progress
        : LockStatus.todo,
    },
  ];

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
            "bg-[#00D1FF] text-white hover:bg-[#00D1FF]/80 dark:bg-cyan-600 dark:hover:bg-blue-love",
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
            selected: "bg-[#00D1FF] text-white hover:bg-[#00D1FF]/80",
            disabled: "text-gray-500",
          },
        },
      },
      months: {
        items: {
          base: "grid w-64 grid-cols-4",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
            selected: "bg-[#00D1FF] text-white hover:bg-[#00D1FF]/80",
            disabled: "text-gray-500",
          },
        },
      },
      years: {
        items: {
          base: "grid w-64 grid-cols-4",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
            selected: "bg-[#00D1FF] text-white hover:bg-[#00D1FF]/80",
            disabled: "text-gray-500",
          },
        },
      },
      decades: {
        items: {
          base: "grid w-64 grid-cols-4",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center font-semibold leading-9  text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
            selected: "bg-[#00D1FF] text-white hover:bg-[#00D1FF]/80",
            disabled: "text-gray-500",
          },
        },
      },
    },
  };

  const carouselTheme: CustomFlowbiteTheme["carousel"] = {
    root: {
      base: "relative h-full w-full",
      // leftControl:
      //   "absolute left-[-20px] top-0 flex h-full items-center justify-center px-4 focus:outline-none",
      // rightControl:
      //   "absolute right-[-20px] top-0 flex h-full items-center justify-center px-4 focus:outline-none",
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

  const clear = useCallback(async () => {
    let newSteps = [...steps];
    if (account) {
      newSteps[0].image = "open-done.svg";
      newSteps[0].status = LockStatus.done;
      newSteps[1].image = "arrow-done.svg";
      newSteps[1].status = LockStatus.done;
      newSteps[2].image = "open-current.svg";
      newSteps[2].status = LockStatus.progress;
      newSteps[3].image = "arrow-active.svg";
      newSteps[3].status = LockStatus.progress;
    }

    setLoadedToken(empty);
    setInputToken("");
    setInputAmount("");
    setInputDate(new Date());
    setLocked(false);
  }, [account, setLoadedToken, setInputAmount, setInputDate, setLocked]);

  const onInputAmountChange = (value: string) => {
    const re = new RegExp("^[+]?([0-9]+([.][0-9]*)?|[.][0-9]+)$");

    if (value === "" || re.test(value)) {
      setInputAmount(value);
    }

    return false;
  };

  const onLoadToken = useCallback(async () => {
    setLoading(true);
    if (signer && account && inputToken) {
      const tokenData = await tokenInfos(signer, inputToken);
      setLoadedToken(tokenData);
    }
    setLoading(false);
  }, [inputToken, account, signer, setLoading, setLoadedToken]);

  const onApprove = useCallback(async () => {
    setLoading(true);
    if (signer && loadedToken) {
      await handleApproval(
        loadedToken.token,
        loadedToken.decimals,
        inputAmount,
        signer
      );
      await onCheckAllowance();
    }
    setLoading(false);
  }, [signer, inputAmount, loadedToken, setLoading]);

  const onCheckAllowance = useCallback(async () => {
    if (signer && loadedToken) {
      const allowance = await hasAllowance(
        loadedToken.token,
        loadedToken.decimals,
        inputAmount,
        signer
      );

      return setAllowed(allowance);
    }

    return setAllowed(false);
  }, [signer, inputAmount, loadedToken]);

  const onLock = useCallback(async () => {
    setLoading(true);
    if (signer) {
      const response = await lock(
        loadedToken.token,
        loadedToken.decimals,
        inputAmount,
        timestamp,
        signer
      );

      setLocked(response.success);

      await onLoadToken();
      await onCheckAllowance();
      await getEvents();
    }

    setLoading(false);
  }, [signer, loadedToken, inputAmount, timestamp, setLoading, setLocked]);

  const onUnlock = useCallback(
    async (event: Event) => {
      setLoading(true);
      if (signer) {
        await unlock(event.lockData.token, event.lockData.id, signer);
        await getEvents();
        if (loadedToken.valid && loadedToken.token === event.lockData.token) {
          await onLoadToken();
        }
      }

      setLoading(false);
    },
    [signer, loadedToken, inputAmount, inputDate, setLoading]
  );

  useEffect(() => {
    if (inputAmount !== "" && Number(inputAmount) > 0) {
      onCheckAllowance();
    }
  }, [inputAmount]);

  const getEvents = useCallback(async () => {
    if (signer) {
      const response: Event[] = await getAllEvents(signer);
      setEvents(response);
    }
  }, [signer]);

  useEffect(() => {
    if (signer) getEvents();
  }, [signer]);

  useEffect(() => {
    const parsedTime = parse(inputTime, "HH:mm", inputDate);
    setTimestamp(getUnixTime(parsedTime));
  }, [inputDate, inputTime, setTimestamp]);

  useEffect(() => {
    if (!account) {
      clear();
    }
  }, [account]);

  return (
    <>
      <div className="flex flex-col relative w-full min-h-[700px]">
        <div className="flex justify-center items-center text-gray-900 self-center mt-10 text-lg gap-2  border-b border-black w-max">
          LOCK ANY TOKEN WITH{" "}
          <span className="text-blue-love">L2VE LOCKER</span>
        </div>
        <div className="flex self-center mt-10 lg:mt-20 lg:mb-10">
          {steps.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 lg:gap-5 flex-wrap w-[50px] lg:w-[60px] text-center text-[11px] lg:text-[13px]"
            >
              <Image
                src={`/v2/lock-steps/${item.image}`}
                width={24}
                height={24}
                alt={item.text}
                className={`${
                  item.text === ""
                    ? "mt-2 max-w-[12px] max-h-[12px] lg:max-w-[14px] lg:max-h-[14px]"
                    : "max-w-[20px] max-h-[20px] lg:max-w-[24px] lg:max-h-[24px]"
                }`}
              />
              <div
                className={`${
                  item.status === LockStatus.todo
                    ? "opacity-30"
                    : item.status === LockStatus.done
                    ? "text-blue-love"
                    : ""
                }`}
              >
                {item.text}
              </div>
            </div>
          ))}
        </div>

        <div
          id="locker"
          className="flex flex-col w-full lg:max-w-[500px] min-h-[240px] gap-3 p-6 pt-[6px] bg-locker bg-no-repeat-y text-white self-center mt-5 text-[14px]"
        >
          <div className="text-[12px]">L2VE LOCKER</div>
          <div className="flex items-center gap-3 pt-5">
            <input
              type="text"
              placeholder="FILL THE DESIRED TOKEN ADDRESS"
              className="w-full text-black max-h-[22px] rounded-md placeholder-black"
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
            />
            <button
              disabled={loading || inputToken === "" || loadedToken.valid}
              type="button"
              className={`inline-flex justify-center items-center w-[131px] h-[28px] rounded-md bg-[#00D1FF]  text-[#F0EFEF] focus:outline-none focus-visible:ring-0  ${
                loading || inputToken === "" || loadedToken.valid
                  ? "opacity-20"
                  : "opacity-100 hover:opacity-80"
              }`}
              onClick={onLoadToken}
            >
              LOAD
            </button>
          </div>
          {!loadedToken.empty && loadedToken.valid && (
            <div className="flex items-center justify-between mt-[-8px]">
              <div>TOKEN: {loadedToken.symbol.toUpperCase()}</div>
              <div>BALANCE: {loadedToken.balance.toLocaleString("en-us")}</div>
            </div>
          )}

          {!loadedToken.empty && !loadedToken.valid && (
            <div className="flex items-center justify-between text-red-600">
              <div>TOKEN: {inputToken.toUpperCase()} IS INVALID!</div>
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
            className={`w-full text-black rounded-md placeholder-black ${
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
              id="datepicker"
              disabled={
                loading ||
                loadedToken.balance === 0 ||
                Number(inputAmount) === 0 ||
                Number(inputAmount) > loadedToken.balance
              }
              className="w-full"
              value={format(inputDate, "dd/MM/yyyy")}
              onSelectedDateChanged={(e) => setInputDate(e)}
              theme={customTheme}
              minDate={parse(inputTime, "HH:mm", new Date())}
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
              <input
                type="time"
                id="time"
                className="leading-none text-gray-900 text-[16px]  focus:ring-[#00D1FF] focus:border-[#00D1FF] block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#00D1FF] dark:focus:border-[#00D1FF] w-[100px]  max-h-[22px] rounded-md placeholder-black pl-3"
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
              <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400 z-20"
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
            </div>
          </div>

          <button
            disabled={
              loading ||
              loadedToken.balance === 0 ||
              Number(inputAmount) === 0 ||
              Number(inputAmount) > loadedToken.balance ||
              locked
            }
            type="button"
            className={`inline-flex justify-center items-center h-[28px] rounded-md bg-[#00D1FF]  text-[#F0EFEF] focus:outline-none focus-visible:ring-0 w-full enabled:hover:opacity-80 ${
              loading ||
              loadedToken.balance === 0 ||
              Number(inputAmount) === 0 ||
              Number(inputAmount) > loadedToken.balance ||
              locked
                ? "opacity-20"
                : "opacity-100"
            }`}
            onClick={allowed ? onLock : onApprove}
          >
            {loading ? "LOADING..." : allowed ? "LOCK" : "APPROVE"}
          </button>

          {locked && (
            <button onClick={clear} className="text-white">
              LOCK AGAIN
            </button>
          )}
        </div>

        {events.length > 0 && (
          <div className="flex flex-col w-full lg:max-w-[500px] gap-4 text-gray-900 self-center mt-10">
            <div className="flex justify-center items-center self-center text-lg gap-2 border-b border-black w-max">
              YOUR LOCKS
            </div>

            <div className="h-[200px]">
              <Carousel
                slide={false}
                theme={carouselTheme}
                leftControl=" "
                rightControl=" "
              >
                {events.map((event: Event, index: number) => (
                  <div
                    key={index}
                    className="flex px-8 lg:px-12 h-[200px] bg-black/15"
                  >
                    <div className="flex flex-col text-center items-center justify-center gap-1 py-6 text-black w-full px-4 lg:px-10">
                      <div className="font-bold text-sm lg:text-[16px] text-[#00D1FF] bg-black/80 p-2">
                        {event.lockData.symbol}:{event.lockData.token}
                      </div>

                      <div className="flex justify-between items-center text-sm lg:text-[16px]">
                        <div className="pt-2">
                          <div>
                            Locked at:{" "}
                            {format(
                              fromUnixTime(event.lockData.lockedAt),
                              "dd/MM/yyyy - HH:mm"
                            )}
                          </div>
                          <div>
                            Amount:{" "}
                            {event.lockData.amount.toLocaleString("en-us")}{" "}
                            {event.lockData.symbol}
                          </div>
                          <div className="border-t border-black mt-2 pt-2">
                            Locked until:{" "}
                            {format(
                              fromUnixTime(event.lockData.lockedUntil),
                              "dd/MM/yyyy - HH:mm"
                            )}
                          </div>
                          {event.lockData.unlockedAt > 0 && (
                            <div>
                              Unlocked at:{" "}
                              {format(
                                fromUnixTime(event.lockData.unlockedAt),
                                "dd/MM/yyyy - HH:mm"
                              )}
                            </div>
                          )}
                          <button
                            onClick={() => onUnlock(event)}
                            className={`${
                              event.lockData.unlockedAt > 0 ||
                              getUnixTime(new Date()) <
                                event.lockData.lockedUntil
                                ? "hidden"
                                : "inline-flex"
                            }  justify-center items-center rounded-md bg-gray-600 text-[#00D1FF] text-sm lg:text-[16px]  focus:outline-none focus-visible:ring-0 py-1 px-3 lg:px-6 hover:opacity-80 h-[22px] mt-2 ${
                              loading ? "opacity-20" : "opacity-100"
                            }`}
                          >
                            {loading ? "LOADING..." : "UNLOCK"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
