import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-[3500px]">
      {/* STAGE 1 */}
      <div className="flex justify-between w-full mt-20">
        <Image src="/mark-1.svg" alt="Stage 1" width={190} height={295} />
        <div className="flex flex-col max-w-[505px]">
          {/* TITLE */}
          <div className="flex flex-col text-blue-love leading-[90px]">
            <p className="font-medium text-[64px]">ALL YOU NEED IS</p>
            <p className="font-bold text-[96px] tracking-[-2px]">L2 + VE</p>
          </div>
          {/* DESCRIPTION */}
          <div className="flex flex-col gap-10 font-medium text-[20px] text-blue-love/70 mt-[40px]">
            <p>
              Cupid Inu has landed on BASE! His mission is to scatter as much
              $L2VE as possible. For this mission he travels from one L2
              blockchain to the next.
            </p>
            <p>
              Read Cupid Inu's Medium article to learn how you can generate
              passive income with a little $L2VE. Forever.
            </p>
          </div>
          {/* BUTTONS */}
          <div className="flex items-center gap-[37px] mt-[26px]">
            <button className="flex items-center justify-center h-[56px] rounded-[10px] shadow-black/25 shadow-md font-semibold text-[14px] tracking-[3px] bg-blue-love text-white px-6">
              MEDIUM
            </button>
            <button className="flex items-center justify-center h-[56px] rounded-[10px] shadow-black/25 shadow-md font-semibold text-[14px] tracking-[3px] bg-white text-blue-love px-6">
              BUY $L2VE
            </button>
          </div>
        </div>
        <Image src="/mascout.svg" alt="Mascout" width={592} height={775} />
      </div>
      {/* STAGE 2 */}
      <div className="flex justify-between w-full">
        <Image
          src="/rocket-in-space.svg"
          alt="Rocket"
          width={466.14}
          height={935}
        />
        <div className="flex flex-col max-w-[716px]">
          {/* TITLE */}
          <div className="flex flex-col text-blue-love leading-[60px] mt-14 ml-[-200px]">
            <p className="font-bold text-[96px] tracking-[-2px]">L2 + VE?</p>
            <p className="font-bold text-[40px]">WHAT DOES THIS EVEN MEAN?</p>
          </div>
          {/* BOXES */}
          <div className="flex flex-col gap-14 font-medium text-[20px] text-blue-love mt-[40px]">
            <div className="py-6 px-12 shadow-lg rounded-[20px] bg-white text-center ml-[-200px] max-w-[780px]">
              Cupid Inu is in <span className="font-bold">$L2VE</span> with{" "}
              <span className="font-bold">L2 Blockchains</span>, but even more
              he's in <span className="font-bold">$L2VE</span> with passive
              income! By accumulating{" "}
              <span className="font-bold">ve3,3 voting power</span> through a
              tax, he wants to create an everlasting APR for $L2VE, because{" "}
              <span className="font-bold">$L2VE never ends</span>!
            </div>
            <div className="flex items-center py-3 px-12 shadow-lg rounded-[20px] bg-white text-center ml-[-100px] max-w-[780px] gap-10">
              <div className="flex items-center justify-center">
                <Image
                  src="/jerrycan.svg"
                  alt="jerrycan"
                  width={135}
                  height={135}
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
              <div className="min-w-1 h-full bg-blue-love font-bold text-[16px]"></div>
              <div>Deploy Liquidity on UniSwap v3.</div>
            </div>

            <div className="flex items-center py-3 px-12 shadow-lg rounded-[20px] bg-white text-center ml-[-180px] max-w-[780px] gap-16">
              <div className="flex items-center justify-center w-full">
                <Image
                  src="/jerrycan.svg"
                  alt="jerrycan"
                  width={135}
                  height={135}
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
                    className="mt-[-5px]"
                  />
                </div>
              </div>
              <div className="min-w-1 h-full bg-blue-love font-bold text-[16px]"></div>
              <div>
                Deploy Liquidity on Aerodome. Vote with veAERO on $L2VE pair.
                Good APR. Forever.
              </div>
            </div>
          </div>
        </div>
        <Image src="/mark-2.svg" alt="Stage 1" width={202} height={295} />
      </div>
    </main>
  );
}
