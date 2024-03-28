"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Slider {
  title: string;
  start: number;
  goal: number;
  current: number;
  currentAmount: number;
  currency?: string;
}

export default function Slider({
  title,
  start,
  goal,
  current,
  currentAmount,
  currency,
}: Slider) {
  const [progress, setProgress] = useState("");
  const [rocketProgress, setRocketProgress] = useState("");

  useEffect(() => {
    setProgress(`${current}%`);
    setRocketProgress(`${current - 8}%`);
  }, [current, setProgress, setRocketProgress]);

  return (
    <div className="flex flex-col">
      <div className="text-white dark:text-dark-love text-center">{title}</div>
      <div className="w-full xl:px-12 mt-32">
        <div className="flex w-full h-[50px] bg-white dark:bg-[#11151E] rounded-[20px] relative">
          <div
            className={`absolute top-0 left-0 flex h-[50px] bg-blue-love dark:bg-dark-love rounded-[20px]`}
            style={{ width: progress }}
          />
          <Image
            src="/rocket.svg"
            alt="veAero"
            width={140}
            height={173}
            className={`absolute top-[-10px]`}
            style={{ left: rocketProgress }}
          />
          <span
            className={`absolute bottom-16 font-bold text-blue-love text-[24px]`}
            style={{ left: rocketProgress }}
          >
            {currency}
            {currentAmount.toLocaleString("en-us")} (
            {current.toLocaleString("en-us", { maximumFractionDigits: 2 })}%)
          </span>
        </div>
      </div>
      <div className="flex justify-between">
        <div>{start}</div>
        <div className="text-white dark:text-dark-love">
          {currency}
          {goal.toLocaleString("en-us")}
        </div>
      </div>
    </div>
  );
}
