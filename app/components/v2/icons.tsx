import Link from "next/link";
import { useDisconnect } from "@web3modal/ethers/react";

import ConnectButtonV4 from "../connectbuttonV4";
import Image from "next/image";

export default function Icons() {
  const { disconnect } = useDisconnect();
  return (
    <>
      {/* DESKTOP */}
      <div className="hidden lg:flex flex-col w-full lg:max-w-[20%] pt-14 z-20">
        <div className="flex flex-col items-start w-full h-full pb-24 gap-10">
          <ConnectButtonV4 />

          <Link
            href="https://opensea.io/collection/l2ve-nft"
            target="blank"
            className="flex flex-col items-center gap-[10px] mt-[-24px]"
          >
            <div className="w-[56.48px] h-[66.48px] transition-all bg-opensea bg-no-repeat bg-cover hover:opacity-80" />
            <span className="w-28 text-center transition-all bg-[#F9F9F9] hover:bg-[#F9F9F9]/80 hover:shadow-inner text-black text-[14.62px] font-bold">
              COLLECTION
            </span>
          </Link>

          <Link
            href="/locker"
            className="flex flex-col items-center gap-[10px]"
          >
            <svg
              width="40"
              height="46"
              viewBox="0 0 14 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex self-center"
            >
              <path d="M4 0.5H10V2.4H4V0.5Z" fill="black" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 19.5V17.6H0V8.1H2V2.4H4V6.2H10V2.4H12V8.1H14V17.6H12V19.5H2ZM8 15.7V13.8H10V10H8V11.9H6V10H4V13.8H6V15.7H8Z"
                fill="black"
              />
            </svg>

            <span className="w-28 text-center transition-all bg-[#F9F9F9] hover:bg-[#F9F9F9]/80 hover:shadow-inner text-black text-[14.62px] font-bold">
              LOCKER
            </span>
          </Link>

          <Link href="/swap" className="flex flex-col items-center gap-[10px]">
            <div className="w-[50px] h-[50px] text-gray-300 bg-black rounded-full p-2">
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
                  d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                ></path>
              </svg>
            </div>

            <span className="w-28 text-center transition-all bg-[#F9F9F9] hover:bg-[#F9F9F9]/80 hover:shadow-inner text-black text-[14.62px] font-bold">
              SWAP
            </span>
          </Link>

          {/* COPYRIGHTS */}
          <span className="flex -rotate-90 text-black text-[12px] mt-32 ml-[-98px]">
            2025® ALL RIGHTS RESERVED
          </span>
        </div>
      </div>

      {/* MOBILE */}
      <div className="flex lg:hidden w-full bg-white fixed bottom-0 h-[64px] z-20 border-t border-black">
        <div className="flex w-full h-full justify-between items-center px-5">
          <Link
            href="https://opensea.io/collection/l2ve-nft"
            target="blank"
            className="flex flex-col items-center gap-[2px] hover:opacity-70"
          >
            <Image
              src="/opensea.svg"
              width={24}
              height={24}
              alt="collection"
              className="flex self-center w-[32px] h-[32px] mt-[-8px]"
            />
            <span className="text-center text-black text-[14.62px] font-bold">
              COLLECTION
            </span>
          </Link>

          <Link
            href="/locker"
            className="flex flex-col items-center gap-[2px] hover:opacity-70"
          >
            <svg
              viewBox="0 0 14 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex self-center w-[24px] h-[24px]"
            >
              <path d="M4 0.5H10V2.4H4V0.5Z" fill="black" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 19.5V17.6H0V8.1H2V2.4H4V6.2H10V2.4H12V8.1H14V17.6H12V19.5H2ZM8 15.7V13.8H10V10H8V11.9H6V10H4V13.8H6V15.7H8Z"
                fill="black"
              />
            </svg>

            <span className="text-center text-black text-[14.62px] font-bold">
              LOCKER
            </span>
          </Link>
          <Link
            href="/swap"
            className="flex flex-col items-center gap-[2px] hover:opacity-70"
          >
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
                d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
              ></path>
            </svg>

            <span className="text-center text-black text-[14.62px] font-bold">
              SWAP
            </span>
          </Link>

          <ConnectButtonV4 />
        </div>
      </div>
    </>
  );
}
