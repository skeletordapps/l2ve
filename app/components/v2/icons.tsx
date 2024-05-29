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

          <Link
            href="#"
            aria-disabled
            className="flex flex-col items-center gap-[10px] opacity-35"
          >
            <svg
              width="48"
              height="44"
              viewBox="0 0 26 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex self-center"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.8696 0H10.1739V1.65H8.47826V3.3H6.78261V4.95H5.08696V6.6H3.3913V8.25H1.69565V9.9H0V11.55H1.69565V13.2H3.3913V14.85H5.08696V17.05H6.78261V18.7H8.47826V20.35H10.1739V22H11.8696V20.35H13.5652V18.7H15.2609V17.05H17.5217V13.2H19.2174V11.55H22.6087V13.2H20.913V14.85H22.6087V13.2H24.3043V11.55H26V9.9H24.3043V8.25H22.6087V6.6H20.913V8.25H22.6087V9.9H19.2174V8.25H17.5217V4.95H15.2609V3.3H13.5652V1.65H11.8696V0ZM11.8696 20.35H10.1739V18.7H8.47826V17.05H6.78261V14.85H5.08696V13.2H3.3913V11.55H15.2609V13.2H13.5652V17.05H11.8696V20.35ZM11.8696 1.65V4.95H13.5652V8.25H15.2609V9.9H3.3913V8.25H5.08696V6.6H6.78261V4.95H8.47826V3.3H10.1739V1.65H11.8696Z"
                fill="black"
              />
            </svg>
            <span className="w-28 text-center transition-all bg-[#F9F9F9] hover:bg-[#F9F9F9]/80 hover:shadow-inner text-black text-[14.62px] font-bold">
              MULTISENDER
            </span>
          </Link>

          {/* COPYRIGHTS */}
          <span className="flex -rotate-90 text-black text-[12px] mt-32 ml-[-98px]">
            2024® ALL RIGHTS RESERVED
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
            aria-disabled
            href="#"
            className="flex flex-col items-center gap-[2px] enabled:hover:opacity-70 opacity-35"
          >
            <svg
              width="18"
              height="14"
              viewBox="0 0 26 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex self-center w-[24px] h-[22px]"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.8696 0H10.1739V1.65H8.47826V3.3H6.78261V4.95H5.08696V6.6H3.3913V8.25H1.69565V9.9H0V11.55H1.69565V13.2H3.3913V14.85H5.08696V17.05H6.78261V18.7H8.47826V20.35H10.1739V22H11.8696V20.35H13.5652V18.7H15.2609V17.05H17.5217V13.2H19.2174V11.55H22.6087V13.2H20.913V14.85H22.6087V13.2H24.3043V11.55H26V9.9H24.3043V8.25H22.6087V6.6H20.913V8.25H22.6087V9.9H19.2174V8.25H17.5217V4.95H15.2609V3.3H13.5652V1.65H11.8696V0ZM11.8696 20.35H10.1739V18.7H8.47826V17.05H6.78261V14.85H5.08696V13.2H3.3913V11.55H15.2609V13.2H13.5652V17.05H11.8696V20.35ZM11.8696 1.65V4.95H13.5652V8.25H15.2609V9.9H3.3913V8.25H5.08696V6.6H6.78261V4.95H8.47826V3.3H10.1739V1.65H11.8696Z"
                fill="black"
              />
            </svg>
            <span className="text-center text-black text-[14.62px] font-bold">
              MULTISENDER
            </span>
          </Link>
          <ConnectButtonV4 />
        </div>
      </div>
    </>
  );
}
