"use client";
import Image from "next/image";
import { useContext, useState } from "react";
import { ROUTES } from "@/app/utils/consts";
import Link from "next/link";
import { StateContext } from "../context/StateContext";
import { Transition } from "@headlessui/react";
import { CustomConnectButton } from "./connectButton";

export default function Nav() {
  const { page } = useContext(StateContext);
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* DESKTOP */}
      <main className="hidden xl:flex items-center justify-between py-[32px] w-full px-[104px]">
        <Link href="/" className="hover:opacity-75">
          <Image src={"/logo.svg"} width={220} height={71} alt="logo" />
        </Link>
        <div className="flex items-center justify-center font-semibold w-full">
          <div className="flex items-center gap-[56px] text-[14px]">
            {ROUTES.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`transition-all tracking-[3px] ${
                  item.href === page
                    ? "text-blue-love"
                    : "text-blue-love/40 hover:hover:text-blue-love"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <CustomConnectButton />
        {/* <button
          className="flex justify-center items-center transition-all bg-button hover:scale-[1.02] hover:opacity-80 bg-contain bg-no-repeat min-w-[212px] max-w-[212px] h-[56px] font-semibold text-[14px] tracking-[3px] text-blue-love"
          onClick={() => {}}
        >
          BUY $L2VE
        </button> */}
      </main>
      {/* MOBILE */}
      <main className="flex xl:hidden w-full sm:px-4 relative">
        <div
          className={`flex items-center justify-between w-full py-[20px] px-[10px]`}
        >
          <Link href="/" className="hover:opacity-75">
            <Image
              src={"/logo.svg"}
              width={180}
              height={71}
              alt="logo"
              className="w-[140px] sm:w-[180px]"
            />
          </Link>
          <div className="flex items-center justify-center flex-1"></div>
          <div className="flex flex-row items-center gap-3">
            <button
              className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] text-blue-love"
              onMouseEnter={() => setOpen(true)}
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <Transition
          show={open}
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          onMouseLeave={() => setOpen(false)}
        >
          <div className="absolute top-[75px] right-0 w-full px-4">
            <div className="text-slate-600 dark:text-slate-400 flex justify-center items-center flex-wrap gap-10 text-[14px] bg-white/40 dark:bg-blue-love/30 backdrop-blur-[8px] shadow-2xl py-10 rounded-b-xl">
              {ROUTES.filter((item) => item.title !== "Legal Disclaimer").map(
                (item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`hover:text-blue-love hover:border-b border-blue-love ${
                      item.href === page && "text-blue-love border-b"
                    }`}
                  >
                    {item.title}
                  </Link>
                )
              )}
            </div>
          </div>
        </Transition>
      </main>
    </>
  );
}
