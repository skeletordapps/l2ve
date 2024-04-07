"use client";
import { useEffect, useState } from "react";
import { format, addMinutes } from "date-fns";

export default function Nav() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const formattedDate = format(
        addMinutes(date, date.getTimezoneOffset()),
        "EEEE, LLLL d hh:mm:ss"
      );
      setTime(formattedDate);
    }, 60);
  }, []);
  return (
    <div className="h-[40px] bg-white border-b border-black flex items-center justify-between px-10">
      <div className="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16">
          <path
            d="M 2.714 0 L 2.714 2.667 L 0 2.667 L 0 8 L 2.714 8 L 2.714 10.667 L 5.43 10.667 L 5.43 13.333 L 8.144 13.333 L 8.144 16 L 10.858 16 L 10.858 13.333 L 13.572 13.333 L 13.572 10.667 L 16.287 10.667 L 16.287 8 L 19 8 L 19 2.667 L 16.286 2.667 L 16.286 0 L 10.857 0 L 10.857 2.667 L 8.143 2.667 L 8.143 0 Z"
            fill="rgb(20,20,20)"
          ></path>
        </svg>
      </div>
      <div className="w-max">
        <svg xmlns="http://www.w3.org/2000/svg" width="49" height="15">
          <path
            d="M 21.202 0 L 14.173 0 L 14.173 1.959 L 12.214 1.959 L 12.214 5.069 L 15.095 5.069 L 15.095 3.112 L 20.165 3.112 L 20.165 6.684 L 23.161 6.684 L 23.161 1.959 L 21.202 1.959 L 21.202 -0.001 Z M 28.626 14.849 L 28.626 12.904 L 26.612 12.904 L 26.612 8.969 L 24.6 8.969 L 24.6 -0.001 L 27.505 -0.001 L 27.505 7.802 L 29.519 7.802 L 29.519 11.737 L 30.663 11.737 L 30.663 7.802 L 32.676 7.802 L 32.676 0 L 35.605 0 L 35.605 8.969 L 33.569 8.969 L 33.569 12.904 L 31.555 12.904 L 31.555 14.849 L 28.627 14.849 Z M 39.027 14.849 L 39.027 12.904 L 37.014 12.904 L 37.014 1.968 L 39.027 1.968 L 39.027 0 L 45.982 0 L 45.982 1.968 L 48.019 1.968 L 48.019 5.079 L 45.09 5.079 L 45.09 3.134 L 39.92 3.134 L 39.92 5.88 L 43.969 5.88 L 43.969 8.969 L 39.919 8.969 L 39.919 11.737 L 45.09 11.737 L 45.09 9.77 L 48.019 9.77 L 48.019 12.905 L 45.982 12.905 L 45.982 14.85 L 39.027 14.85 Z M 2.013 12.904 L 2.013 14.849 L 8.97 14.849 L 8.97 12.904 L 11.006 12.904 L 11.006 9.77 L 8.076 9.77 L 8.076 11.737 L 2.906 11.737 L 2.906 0 L 0 0 L 0 12.904 Z M 12.214 9.795 L 15.21 9.795 L 15.21 11.753 L 23.161 11.753 L 23.161 14.864 L 14.288 14.864 L 14.288 12.906 L 12.214 12.906 Z"
            fill="rgb(18, 18, 18)"
          ></path>
          <path
            d="M 20.165 6.683 L 15.21 6.683 L 15.21 9.795 L 20.165 9.795 L 20.165 6.682 Z"
            fill="rgb(18, 18, 18)"
          ></path>
        </svg>
      </div>
      <div className="flex items-center justify-end text-[23px] gap-8 w-full">
        <span className="text-black/70 text-2xl">{time}</span>
        <svg
          width="21"
          height="21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#a)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.625 0h1.75v3.5h-1.75V0Zm.875 10.5H7v1.75H3.5V14H1.75v3.5H3.5v1.75h8.75V17.5H14V14h-1.75v-1.75H10.5V10.5Zm0 1.75V14h1.75v3.5H3.5V14H7v1.75h1.75V14H7v-1.75h3.5Zm-3.5-7h5.25V7H7V5.25ZM7 7v1.75H5.25V7H7Zm7 1.75h-1.75V7H14v1.75Zm0 0h1.75v1.75H14V8.75Zm3.5-7h1.75V3.5H17.5V1.75Zm0 1.75v1.75h-1.75V3.5h1.75ZM1.75 1.75H3.5V3.5H1.75V1.75ZM3.5 3.5h1.75v1.75H3.5V3.5ZM21 9.625h-3.5v1.75H21v-1.75Z"
              fill="#000"
            />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M0 0h21v21H0z" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}
