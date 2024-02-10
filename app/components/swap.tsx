"use client";
import { SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import { useCallback, useEffect, useState } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useAccount } from "wagmi";

export default function Swap() {
  const [provider, setProvider] = useState<Web3Provider | undefined>();
  const { connector } = useAccount();

  useEffect(() => {
    if (!connector) {
      return () => setProvider(undefined);
    }

    connector.getProvider().then((provider) => {
      setProvider(new Web3Provider(provider));
    });
  }, [connector]);

  return (
    <div id="buy" className="flex flex-col w-full mt-12 sm:mt-24 xl:mt-32">
      {provider && (
        <div className="flex flex-col w-full px-6 md:px-12 xl:px-20 2xl:px-0">
          {/* TITLE */}
          <div className="flex flex-col text-white leading-[40px] sm:leading-[50px] xl:leading-[70px] font-bold mb-10">
            <p className="text-[56px] sm:text-[66px] xl:text-[96px]">
              BUY $L2VE
            </p>
            <p className="text-[20px] sm:text-[28px] xl:text-[48px] xl:tracking-[-2px]">
              SOME FANCY TEXT HERE
            </p>
          </div>
          <div className="Uniswap">
            <SwapWidget
              provider={provider}
              defaultInputTokenAddress="0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
              defaultOutputTokenAddress="0x4200000000000000000000000000000000000006"
              className="!w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
