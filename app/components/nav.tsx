"use client";
import Image from "next/image";
import { useCallback, useContext, useEffect, useState } from "react";
import { ROUTES } from "@/app/utils/consts";
import Link from "next/link";
import { StateContext, Theme } from "../context/StateContext";
import { Transition } from "@headlessui/react";
import { CustomConnectButton } from "./connectButton";
import { dark, light } from "@/public/svgs";

export default function Nav() {
  const { navOpen, page, theme, setNavOpen, setTheme } =
    useContext(StateContext);
  const [options, _] = useState<{ image: React.ReactElement; theme: Theme }[]>([
    { image: light, theme: Theme.light },
    { image: dark, theme: Theme.dark },
  ]);

  const changeTheme = useCallback(
    (selectedTheme: Theme) => {
      setTheme(selectedTheme);
      localStorage.setItem("theme", selectedTheme);

      switch (selectedTheme) {
        case Theme.light:
          document.documentElement.classList.remove("dark");
          break;
        case Theme.dark:
          document.documentElement.classList.add("dark");
          break;
      }
    },
    [setTheme]
  );

  useEffect(() => {
    switch (localStorage.theme as Theme) {
      case Theme.light:
        changeTheme(Theme.light);
        break;
      case Theme.dark:
        changeTheme(Theme.dark);
        break;
      default:
        changeTheme(Theme.light);
        break;
    }
  }, [changeTheme]);

  return (
    <>
      {/* DESKTOP */}
      <main className="hidden xl:flex items-center justify-between py-[32px] w-full px-[50px] 2xl:px-[104px]">
        <Link href="/" className="hover:opacity-75">
          <Image
            src={"/logo.svg"}
            width={220}
            height={71}
            alt="logo"
            className="dark:hue-rotate-[200deg] dark:invert"
          />
        </Link>
        <div className="flex items-center justify-center font-semibold w-full">
          <div className="flex items-center gap-[26px] 2xl:gap-[56px] text-[14px]">
            {ROUTES.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`transition-all tracking-[3px] ${
                  item.href === page
                    ? "text-blue-love dark:text-dark-love"
                    : "text-blue-love/40 dark:text-dark-love/40 hover:hover:text-blue-love dark:hover:text-dark-love"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        {page === "/flip" && <CustomConnectButton />}
        <button
          className="pl-4 2xl:pl-10"
          onClick={() =>
            changeTheme(theme === Theme.light ? Theme.dark : Theme.light)
          }
        >
          <div className="w-[32px] h-[32px] text-blue-love dark:text-dark-love">
            {options.find((option) => option.theme === theme)?.image}
          </div>
        </button>
      </main>
      {/* MOBILE */}
      <main className="flex xl:hidden w-full sm:px-4 relative z-30">
        <div
          className={`flex items-center justify-between w-full py-[20px] px-[10px]`}
        >
          <Link href="/" className="hover:opacity-75">
            <Image
              src={"/logo.svg"}
              width={180}
              height={71}
              alt="logo"
              className="w-[140px] sm:w-[180px] dark:hue-rotate-[15deg]"
            />
          </Link>
          {/* <div className="flex items-center justify-center flex-1"></div> */}
          <div className="flex flex-row items-center gap-3">
            <button
              onClick={() =>
                changeTheme(theme === Theme.light ? Theme.dark : Theme.light)
              }
            >
              <div className="flex items-center justify-center w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] text-blue-love dark:text-dark-love">
                {options.find((option) => option.theme === theme)?.image}
              </div>
            </button>
            <button
              className="flex items-center justify-center w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] text-blue-love dark:text-dark-love"
              onClick={() => setNavOpen(!navOpen)}
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
          show={navOpen}
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          onMouseLeave={() => setNavOpen(false)}
          onClick={() => setNavOpen(!navOpen)}
        >
          <div className="absolute top-[75px] right-0 w-full px-4">
            <div className="text-slate-600 dark:text-slate-400 flex justify-center items-center flex-wrap gap-10 text-[14px] bg-white dark:bg-blue-love dark:bg-dark-love/30 backdrop-blur-[8px] shadow-2xl py-10 rounded-b-xl">
              {ROUTES.filter((item) => item.title !== "Legal Disclaimer").map(
                (item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`hover:text-blue-love dark:text-dark-love hover:border-b border-blue-love ${
                      item.href === page &&
                      "text-blue-love dark:text-dark-love border-b"
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
