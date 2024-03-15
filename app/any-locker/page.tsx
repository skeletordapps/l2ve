"use client";
import DatePicker from "react-datepicker";
import Image from "next/image";
import Footer from "../components/home/footer";
import "react-datepicker/dist/react-datepicker.css";
import { useState, Fragment } from "react";
import { Transition } from "@headlessui/react";
import { useTimeoutFn } from "react-use";
import Link from "next/link";

export default function AnyLocker() {
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [isShowing, setIsShowing] = useState(true);
  const [displayManager, setDisplayManager] = useState(false);
  let [, , resetIsShowing] = useTimeoutFn(() => {
    setIsShowing(true);
  }, 500);

  const onAmountChange = (value: string) => {
    const re = new RegExp("^[+]?([0-9]+([.][0-9]*)?|[.][0-9]+)$");

    if (value === "" || re.test(value)) {
      setAmount(value);
    }
  };

  const locksList = [
    {
      asset: "L2VE",
      address: "0x00000000000000000000000000000000",
      amount: 400_000,
      unlockedUntil: "15/03/2024 1:55 PM UTC",
    },
    {
      asset: "PEPE",
      address: "0x00000000000000000000000000000000",
      amount: 65_000,
      unlockedUntil: "25/06/2024 5:30 PM UTC",
    },
    {
      asset: "SAM",
      address: "0x00000000000000000000000000000000",
      amount: 50_000,
      unlockedUntil: "10/08/2024 11:30 AM UTC",
    },
  ];

  return (
    <main className="flex flex-col items-center">
      <div className="flex justify-center lg:justify-between w-full mt-4 lg:mt-10 relative">
        <Image
          src="/mark-1.svg"
          alt="Stage 1"
          width={190}
          height={295}
          className="hidden 2xl:block dark:hue-rotate-[200deg] dark:invert"
        />
        <div className="flex flex-col w-full px-6 sm:px-14 2xl:px-0 2xl:max-w-[605px] justify-center z-20">
          {/* TITLE */}
          <div className="flex flex-col text-blue-love dark:text-dark-love leading-[50px] sm:leading-[90px]">
            <p className="font-medium text-[38px] xl:text-[44px] 2xl:text-[64px]">
              LOCK WITH
            </p>
            <p className="font-bold text-[54px] md:text-[82px] tracking-[-2px]">
              ANY LOCKER
            </p>
          </div>
          {/* DESCRIPTION */}
          <div className="flex flex-col gap-10 font-medium text-[18px] md:text-[20px] text-blue-love dark:text-dark-love/70 mt-[10px] md:mt-[40px]">
            <p>
              Need to lock your token and share with community to bring trust?
              We do it for your team.
            </p>
          </div>

          <div className="min-h-[700px] max-h-[700px]">
            <Transition
              as={Fragment}
              show={isShowing}
              enter="transform transition duration-[400ms]"
              enterFrom="opacity-0 rotate-[-120deg] scale-50"
              enterTo="opacity-100 rotate-0 scale-100"
              leave="transform duration-200 transition ease-in-out"
              leaveFrom="opacity-100 rotate-0 scale-100 "
              leaveTo="opacity-0 scale-95 "
            >
              <div className="flex flex-col w-full justify-center z-20 ">
                {/* ANY LOCKER BOX */}
                <div className="flex flex-col pb-10 rounded-[4px] bg-white/30 dark:bg-dark-love/10 shadow-xl border border-white/30 mt-10 text-blue-love dark:text-white/70">
                  {/* CREATE BLOCK */}
                  <div
                    className={`${
                      displayManager ? "hidden" : "flex"
                    } flex-col gap-4`}
                  >
                    <div className="flex flex-col gap-2 pb-6 bg-blue-love/20 dark:bg-black/30 border-b border-b-white/20 mb-4 px-4 md:px-10 py-10 rounded-t relative">
                      <div className="absolute top-10 md:top-3 right-3 w-[70px] md:w-[110px] text-blue-love/50 dark:text-dark-love -rotate-12 p-5 bg-blue-love/10 dark:bg-dark-love/10 rounded-full">
                        <svg
                          data-slot="icon"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-2xl font-medium">Add Lock Details</p>
                      <p className="text-sm max-w-[230px] md:max-w-[300px]">
                        Set the token, amount and time period you would like to
                        lock your token.
                      </p>
                    </div>
                    {/* CREATE FORM */}
                    <div className="flex flex-col px-4 md:px-10">
                      <label>Token Address</label>
                      <input
                        placeholder="Enter token address"
                        type="text"
                        className="rounded-[4px] bg-white/70 dark:bg-black/60 border border-blue-love/60 text-black dark:text-white text-sm  py-4"
                      />
                    </div>
                    <div className="flex flex-col relative px-4 md:px-10">
                      <label>Lock amount</label>
                      <input
                        value={amount}
                        placeholder="Enter amount to lock"
                        onChange={(e) => onAmountChange(e.target.value)}
                        type="text"
                        className="rounded-[4px] bg-white/70 border border-blue-love/60 dark:bg-black/60 text-sm  text-black dark:text-white  py-4"
                      />
                      <p className="text-black dark:text-dark-love mt-2 text-end text-sm ">
                        Balance: <span className="text-bold">200 L2VE</span>
                      </p>
                      <button className="absolute top-[38px] right-8 md:right-14 p-1 px-2 bg-blue-love dark:bg-dark-love text-white rounded-full text-[11px]">
                        MAX
                      </button>
                    </div>
                    <div className="flex flex-col relative px-4 md:px-10">
                      <label>Unlock date & time</label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date: any) => setStartDate(date)}
                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy h:mm aa"
                        showTimeSelect
                        minDate={startDate}
                        className="rounded-[4px] bg-white/70 dark:bg-black/60 border border-blue-love/60 text-sm text-black dark:text-white w-full py-4"
                      />

                      <div className="absolute top-10 right-8 md:right-14 w-6 h-6 text-blue-love/70 dark:text-dark-love transition-all hover:text-blue-love">
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
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                          ></path>
                        </svg>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 px-4 md:px-10">
                      <button
                        className={`flex items-center justify-center text-[14px] py-4 rounded-full shadow-black/25 shadow-md font-semibold bg-blue-love dark:bg-dark-love text-white px-6 transition-all hover:scale-[1.03] mt-5 gap-2`}
                      >
                        <div className="w-6 h-6 text-white/80 -rotate-12">
                          <svg
                            data-slot="icon"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              clipRule="evenodd"
                              fillRule="evenodd"
                              d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                            ></path>
                          </svg>
                        </div>
                        <span>LOCK</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsShowing(false);
                          resetIsShowing();
                          setDisplayManager(!displayManager);
                        }}
                        className="transition-all hover:opacity-80 hover:underline"
                      >
                        Manage your locks
                      </button>
                    </div>
                  </div>

                  {/* MANAGER BLOCK */}
                  <div
                    className={`${
                      displayManager ? "flex" : "hidden"
                    } flex-col gap-4`}
                  >
                    <div className="flex flex-col gap-2 pb-6 bg-blue-love/20 dark:bg-black/30 border-b border-b-white/20 mb-4 px-4 md:px-10 py-10 rounded-t relative">
                      <div className="absolute top-10 md:top-3 right-3 w-[70px] md:w-[110px] text-blue-love/50 dark:text-dark-love -rotate-12 p-5 bg-blue-love/10 dark:bg-dark-love/10 rounded-full">
                        <svg
                          data-slot="icon"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 0 1-1.5 0V6.75a3.75 3.75 0 1 0-7.5 0v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H3.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3h9v-3c0-2.9 2.35-5.25 5.25-5.25Z"></path>
                        </svg>
                      </div>
                      <p className="text-2xl font-medium">Manage your locks</p>
                      <p className="text-sm max-w-[230px] md:max-w-[300px]">
                        Check when is time to unlock your tokens and just click
                        unlock button.
                      </p>
                    </div>

                    {/* LOCKS LIST */}
                    <div className="flex flex-col gap-4 max-h-[420px] overflow-scroll px-4">
                      {locksList.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col bg-white/40 dark:bg-black/60 pb-4 rounded-[8px] gap-3 font-light text-black/70 dark:text-white/50"
                        >
                          <div className="flex flex-col bg-white dark:bg-dark-love/40 p-4 rounded-t-[8px]">
                            <label>Asset</label>
                            <p className="flex items-center font-medium text-blue-love dark:text-dark-love text-sm gap-1">
                              <Link
                                href={`https://basescan.org/address/${item.address}`}
                              >
                                {item.asset} CA
                              </Link>
                            </p>
                          </div>
                          <div className="flex flex-col relative px-4">
                            <label>Locked amount</label>
                            <p className="font-medium text-blue-love dark:text-dark-love">
                              {item.amount.toLocaleString("en-us", {
                                maximumFractionDigits: 5,
                              })}
                            </p>
                          </div>
                          <div className="flex flex-col relative px-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-0">
                              <div>
                                <label>Unlock date & time</label>
                                <p className="font-medium text-blue-love dark:text-dark-love">
                                  {item.unlockedUntil}
                                </p>
                              </div>
                              <button
                                className={`flex items-center justify-center text-[14px] py-2 rounded-full shadow-black/25 shadow-md font-semibold bg-blue-love dark:bg-dark-love text-white px-6 transition-all hover:scale-[1.03] gap-2`}
                              >
                                <div className="w-4 h-4 text-white -rotate-12">
                                  <svg
                                    data-slot="icon"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                  >
                                    <path
                                      clipRule="evenodd"
                                      fillRule="evenodd"
                                      d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                                    ></path>
                                  </svg>
                                </div>
                                <span>UNLOCK</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        setIsShowing(false);
                        resetIsShowing();
                      }}
                      className="transition-all hover:opacity-80 hover:underline"
                    >
                      Lock your tokens
                    </button>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
        <Image
          src="/mascout.svg"
          alt="Mascout"
          width={592}
          height={775}
          className="hidden xl:block dark:hue-rotate-[15deg]"
        />
        <Image
          src="/mascout.svg"
          alt="Mascout"
          width={592}
          height={775}
          className="absolute top-0 right-0 xl:hidden z-0 opacity-20 dark:hue-rotate-[15deg]"
        />
      </div>

      <Footer />
    </main>
  );
}
