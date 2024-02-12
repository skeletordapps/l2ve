"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Slider {
  title: string;
  start: number;
  goal: number;
  current: number;
}

export default function Slider({ title, start, goal, current }: Slider) {
  const [progress, setProgress] = useState("");
  const [rocketProgress, setRocketProgress] = useState("");

  useEffect(() => {
    setProgress(`${current}%`);
    setRocketProgress(`${current - 8}%`);
  }, [current, setProgress, setRocketProgress]);

  console.log(progress);

  return (
    <div className="flex flex-col">
      <div className="text-white dark:text-dark-love text-center">{title}</div>
      <div className="w-full xl:px-12">
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
        </div>
      </div>
      <div className="flex justify-between">
        <div>{start}</div>
        <div className="text-white dark:text-dark-love">
          {goal.toLocaleString("en-us")}
        </div>
      </div>
    </div>
  );
}
