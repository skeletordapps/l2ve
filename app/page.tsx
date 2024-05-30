"use client";
import Link from "next/link";
import Nav from "./components/v2/nav";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-col lg:flex-row  lg:px-[54px] ">
        <div className="flex flex-col items-center w-full mt-11 min-h-[100%] relative">
          <Image
            src="/v2/computer.svg"
            width={756.3}
            height={627}
            alt="computer"
            className="w-full lg:w-[950px] lg:h-[810px] opacity-85"
          />
        </div>
      </div>
    </>
  );
}
