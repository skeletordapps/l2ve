import Image from "next/image";

export default function Stage2() {
  return (
    <>
      {/* DESKTOP */}
      <div
        id="spacemap"
        className="hidden xl:flex justify-between w-full relative"
      >
        <Image
          src="/rocket-in-space.svg"
          alt="Rocket"
          width={466.14}
          height={935}
          className="z-20"
        />
        <div className="flex flex-col max-w-[716px] z-20">
          {/* TITLE */}
          <div className="flex flex-col text-blue-love dark:text-dark-love leading-[60px] mt-14 2xl:ml-[-200px]">
            <p className="font-bold text-[96px] tracking-[-2px]">L2 + VE?</p>
            <p className="font-bold text-[40px]">WHAT DOES THIS EVEN MEAN?</p>
          </div>
          {/* BOXES */}
          <div className="flex flex-col gap-20 font-medium text-[20px] text-blue-love dark:text-dark-love mt-[40px]">
            <div className="py-6 px-12 shadow-lg rounded-[20px] bg-white dark:bg-[#11151E] text-center ml-[-200px] max-w-[780px]">
              Cupid Inu is in <span className="font-bold">$L2VE</span> with{" "}
              <span className="font-bold">L2 Blockchains</span>, but even more
              he's in <span className="font-bold">$L2VE</span> with passive
              income! By accumulating{" "}
              <span className="font-bold">ve3,3 voting power</span> through a
              tax, he wants to create an everlasting APR for $L2VE, because{" "}
              <span className="font-bold">$L2VE never ends</span>!
            </div>
            <div className="flex items-center py-3 px-12 shadow-lg rounded-[20px] bg-white dark:bg-[#11151E] text-center ml-[-100px] max-w-[780px] gap-10">
              <div className="flex items-center justify-center">
                <Image
                  src="/jerrycan.svg"
                  alt="jerrycan"
                  width={135}
                  height={135}
                  className="xl:w-[115px] 2xl:w-[135px]"
                />

                <div className="flex flex-col">
                  <span className="font-bold text-[48px] tracking-[-4px] text-center">
                    STAGE I
                  </span>
                  <Image
                    src="/uniswap.svg"
                    alt="uniswap"
                    width={225}
                    height={56}
                    className="mt-[-15px]"
                  />
                </div>
              </div>
              <div className="min-w-1 h-full bg-blue-love dark:bg-dark-love font-bold text-[16px]"></div>
              <div>Deploy Liquidity on UniSwap v3.</div>
            </div>

            <div className="flex items-center py-3 px-12 shadow-lg rounded-[20px] bg-white dark:bg-[#11151E] text-center ml-[-180px] max-w-[780px] gap-16">
              <div className="flex items-center justify-center w-full">
                <Image
                  src="/jerrycan.svg"
                  alt="jerrycan"
                  width={135}
                  height={135}
                  className="xl:w-[115px] 2xl:w-[135px]"
                />

                <div className="flex flex-col">
                  <span className="font-bold text-[48px] tracking-[-4px] text-center w-max">
                    STAGE II
                  </span>
                  <Image
                    src="/aerodrome.svg"
                    alt="uniswap"
                    width={230}
                    height={33}
                    className="mt-[-5px] dark:invert dark:hue-rotate-[200deg]"
                  />
                </div>
              </div>
              <div className="min-w-1 h-full bg-blue-love dark:bg-dark-love font-bold text-[16px]"></div>
              <div>
                Deploy Liquidity on Aerodome. Vote with veAERO on $L2VE pair.
                Good APR. Forever.
              </div>
            </div>
          </div>
        </div>
        <Image
          src="/mark-2.svg"
          alt="Stage 1"
          width={202}
          height={295}
          className="dark:hue-rotate-[200deg] dark:invert"
        />
        <Image
          src="/rocket-path.svg"
          alt="Rocket"
          width={617.82}
          height={1104.86}
          className="absolute top-[490px] left-[33%] z-0 dark:hue-rotate-[-30deg]"
        />
      </div>

      {/* MOBILE */}
      <div
        id="spacemap"
        className="flex xl:hidden justify-between w-full relative px-6 sm:px-12 mt-10"
      >
        <div className="flex flex-col z-20">
          {/* TITLE */}
          <div className="flex flex-col text-blue-love dark:text-dark-love leading-[50px] sm:leading-[60px] mt-14 xl:ml-[-200px]">
            <p className="font-bold text-[66px] sm:text-[96px] tracking-[-2px]">
              L2 + VE?
            </p>
            <p className="font-bold text-[20px] sm:text-[40px]">
              WHAT DOES THIS EVEN MEAN?
            </p>
          </div>
          {/* BOXES */}
          <div className="flex flex-col gap-6 sm:gap-10 font-medium text-[16px] sm:text-[20px] text-blue-love dark:text-dark-love mt-[40px]">
            <div className="py-6 px-6 sm:px-12 shadow-lg rounded-[20px] bg-white dark:bg-[#11151E] text-center">
              Cupid Inu is in <span className="font-bold">$L2VE</span> with{" "}
              <span className="font-bold">L2 Blockchains</span>, but even more
              he's in <span className="font-bold">$L2VE</span> with passive
              income! By accumulating{" "}
              <span className="font-bold">ve3,3 voting power</span> through a
              tax, he wants to create an everlasting APR for $L2VE, because{" "}
              <span className="font-bold">$L2VE never ends</span>!
            </div>
            <div className="flex flex-col sm:flex-row items-center py-3 sm:px-8 shadow-lg rounded-[20px] bg-white dark:bg-[#11151E] sm:text-center gap-4 sm:gap-10">
              <div className="flex items-center justify-center">
                <Image
                  src="/jerrycan.svg"
                  alt="jerrycan"
                  width={135}
                  height={135}
                  className="w-[90px] sm:w-[135px]"
                />

                <div className="flex flex-col w-max">
                  <span className="font-bold text-[28px] tracking-[-2px] sm:text-center w-max">
                    STAGE I
                  </span>
                  <Image
                    src="/uniswap.svg"
                    alt="uniswap"
                    width={225}
                    height={56}
                    className="w-[125px]"
                  />
                </div>
              </div>
              <div className="hidden sm:block min-w-1 h-full bg-blue-love dark:bg-dark-love font-bold text-[16px]" />
              <div className="sm:hidden w-full h-[1px] bg-blue-love dark:bg-dark-love font-bold text-[16px]" />
              <div className="px-10 sm:px-0">
                Deploy Liquidity on UniSwap v3.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center py-3 sm:px-8 shadow-lg rounded-[20px] bg-white dark:bg-[#11151E] sm:text-center gap-4 sm:gap-10">
              <div className="flex items-center justify-center">
                <Image
                  src="/jerrycan.svg"
                  alt="jerrycan"
                  width={135}
                  height={135}
                  className="w-[90px] sm:w-[135px]"
                />

                <div className="flex flex-col w-max">
                  <span className="font-bold text-[28px] tracking-[-2px] sm:text-center w-max">
                    STAGE II
                  </span>
                  <Image
                    src="/aerodrome.svg"
                    alt="uniswap"
                    width={225}
                    height={56}
                    className="w-[125px] sm:w-[225px]"
                  />
                </div>
              </div>
              <div className="hidden sm:block min-w-1 max-w-1 h-full bg-blue-love dark:bg-dark-love font-bold text-[16px]" />
              <div className="sm:hidden w-full h-[1px] bg-blue-love dark:bg-dark-love font-bold text-[16px]" />
              <div className="px-10 sm:px-0">
                Deploy Liquidity on Aerodome. Vote with veAERO on $L2VE pair.
                Good APR. Forever.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
