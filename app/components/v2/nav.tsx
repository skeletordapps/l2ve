"use client";
import { useContext, useEffect, useState } from "react";
import { format, addMinutes } from "date-fns";
import Image from "next/image";
import { StateContext } from "@/app/context/StateContext";
import Link from "next/link";

export default function Nav() {
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const { page } = useContext(StateContext);

  useEffect(() => {
    if (page === "/swap") location.href = "/";
  }, [page]);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const formattedDay = format(
        addMinutes(date, date.getTimezoneOffset()),
        "EEEE, LLLL d, yyyy"
      );

      const formattedTime = format(
        addMinutes(date, date.getTimezoneOffset()),
        "HH:mm:ss"
      );

      setDay(formattedDay);
      setTime(formattedTime);
    }, 60);
  }, []);

  return (
    <div className="h-[40px] bg-white flex items-center justify-between px-[20px] text-[23px] text-black/80  border-b border-black">
      <div className="flex items-center gap-[10px] lg:gap-[25px] w-full">
        <Link href="/" className="w-[19px] h-[16px] z-30">
          <Image src="/v2/heart.svg" width={19} height={16} alt="heart" />
        </Link>
        <span className="text-[23px]">
          {page === "/locker"
            ? "LOCKER"
            : page === "/multisender"
            ? "MULTISENDER"
            : "NFTS GENERATOR COMPUTER"}
        </span>
      </div>
      <div className="w-max">
        <Image
          src="/v2/logo.svg"
          width={90}
          height={21}
          alt="logo"
          className="w-[50px] lg:w-[100px]"
        />
      </div>
      <div className="hidden lg:flex items-center justify-end text-[23px] gap-8 w-full">
        <span>{day}</span>
        <span>{time}</span>
        <Image src="/v2/cloud-sun.svg" width={21} height={21} alt="sun-cloud" />
      </div>
    </div>
  );
}
