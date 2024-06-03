"use client";
import { VT323 } from "next/font/google";
import { Web3Modal } from "./context/web3modal";
import "react-toastify/dist/ReactToastify.css";

import "./globals.css";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import StateProvider, { StateContext } from "./context/StateContext";
import Nav from "./components/v2/nav";
import Icons from "./components/v2/icons";

const vt323 = VT323({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>L2VE</title>
        <meta
          name="description"
          content="Cupid Inu has landed on BASE! His mission is to scatter as much $L2VE as possible. For this mission he travels from one L2 blockchain to the next."
          key="desc"
        />
      </head>
      <body className={`flex flex-col bg-v2 relative ${vt323.className}`}>
        <div className="flex w-full h-full absolute top-0 left-0">
          <div className="relative w-screen min-h-[100svh] items-stretch">
            <Image src="/tv.gif" fill alt="tv" className="opacity-[0.07]" />
          </div>
        </div>
        <ToastContainer theme="dark" />
        <div className="flex flex-col w-full max-w-[1800px] xl:self-center">
          <StateProvider>
            <Web3Modal>
              <div className="flex flex-col">
                <Nav />
                <div className="flex flex-col lg:flex-row lg:justify-between lg:px-[34px]">
                  <Icons />
                  {children}
                  <div className="w-full lg:max-w-[20%]"></div>
                </div>
              </div>
            </Web3Modal>
          </StateProvider>
        </div>
      </body>
    </html>
  );
}
