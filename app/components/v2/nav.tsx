"use client";
import { useEffect, useState } from "react";
import { format, addMinutes } from "date-fns";
import { VT323 } from "next/font/google";
import Image from "next/image";

const vt323 = VT323({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400"],
});

export default function Nav() {
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

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
      <div className="flex items-center gap-[25px] w-full">
        <Image src="/v2/heart.svg" width={19} height={16} alt="heart" />
        <span className="text-xs xl:text-[23px]">NFTS GENERATOR COMPUTER</span>
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
