import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
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
      <div className="flex justify-between w-full relative">
        <Image
          src="/rocket-in-space.svg"
          alt="Rocket"
          width={466.14}
          height={935}
          className="z-20"
        />
        <div className="flex flex-col max-w-[716px] z-20">
          {/* TITLE */}
          <div className="flex flex-col text-blue-love leading-[60px] mt-14 ml-[-200px]">
            <p className="font-bold text-[96px] tracking-[-2px]">L2 + VE?</p>
            <p className="font-bold text-[40px]">WHAT DOES THIS EVEN MEAN?</p>
          </div>
          {/* BOXES */}
          <div className="flex flex-col gap-20 font-medium text-[20px] text-blue-love mt-[40px]">
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
        <Image
          src="/rocket-path.svg"
          alt="Rocket"
          width={617.82}
          height={1104.86}
          className="absolute top-[490px] left-[33%] z-0"
        />
      </div>
      {/* STAGE 3 */}
      <div className="flex justify-between w-full gap-[120px] mt-10 z-20">
        <Image src="/mark-3.svg" alt="Stage 1" width={190} height={295} />

        {/* BOXES */}
        <div className="flex flex-row font-bold text-[20px] text-blue-love mt-[80px] tracking-[-1px] flex-wrap gap-[130px]">
          {/* STATE III */}
          <div className="flex items-center p-8 shadow-lg rounded-[20px] bg-white text-center max-w-[500px] gap-8">
            <div className="flex items-center justify-center">
              <Image
                src="/balls.svg"
                alt="balls"
                width={144}
                height={172.03}
                className="min-w-[144px] min-h-[172.03px]"
              />
            </div>
            <div className="flex flex-col">
              <p>
                <span className="font-bold text-[48px] text-center">
                  STAGE III
                </span>
              </p>
              <p className="leading-[26px]">
                Launch on next L2. Cupid Inu will travel to the next L2 and you
                can choose where to head next!
              </p>
            </div>
          </div>

          <div className="flex flex-col text-blue-love leading-[68px] items-center ml-[-84px] mt-[-84px]">
            <p className="font-bold text-[96px] tracking-[-2px]">SPACEMAP</p>
            <p className="font-bold text-[48px]">TO INFINITY AND BEYOND</p>
          </div>

          {/* STAGE IV */}
          <div className="flex items-center p-8 shadow-lg rounded-[20px] bg-white text-center max-w-[500px] gap-8 ml-[-44px]">
            <div className="relative min-w-[94px] min-h-[172.03px]">
              <Image
                src="/parachute.svg"
                alt="parachute"
                width={223}
                height={223}
                className="absolute min-w-[223px] min-h-[223px] top-[-28px] left-[-42px]"
              />
            </div>
            <div className="flex flex-col">
              <p>
                <span className="font-bold text-[48px] text-center">
                  STAGE IV
                </span>
              </p>
              <p className="leading-[26px]">
                Airdrop to $L2VE Holders on BASE. 10% Airdrop Allocation on
                every new L2 Cupid Inu discovers.
              </p>
            </div>
          </div>

          {/* STAGE V */}
          <div className="flex items-center p-8 shadow-lg rounded-[20px] bg-white text-center max-w-[500px] max-h-[240px] gap-4 mt-[-200px] ml-[120px]">
            <div className="flex items-center justify-center">
              <Image
                src="/infinity.svg"
                alt="infinity"
                width={156}
                height={168}
                className="min-w-[156px] min-h-[168px]"
              />
            </div>
            <div className="flex flex-col">
              <p>
                <span className="font-bold text-[48px] text-center">
                  STAGE V
                </span>
              </p>
              <p className="leading-[26px]">
                Same Strategy. Accumulate ve3,3, provide endless APR and move on
                to next L2 with Airdrop.
              </p>
            </div>
          </div>
        </div>

        <div className="w-[200px]" />
      </div>

      {/* SEPARATOR */}
      <div className="flex items-center justify-center w-full h-[127px] px-[100px]  mt-16">
        <div className="flex items-center justify-center w-full h-[127px] bg-separator bg-cover bg-no-repeat bg-center" />
      </div>

      {/* STAGE 4 */}
      <div className="flex justify-between w-full mt-32">
        <div className="w-[200px]" />
        <div className="flex flex-col w-full">
          {/* TITLE */}
          <div className="flex flex-col text-white leading-[70px] font-bold">
            <p className="text-[96px]">STATISTICS</p>
            <p className="text-[48px] tracking-[-2px]">
              PEOPLE DO LIE, NUMBERS DON'T
            </p>
          </div>

          {/* GRAPHFICS */}
          <div className="flex flex-col font-bold text-[48px] tracking-[-4%] text-blue-love max-w-[1143px] mt-20 gap-14">
            <div className="flex flex-col">
              <div className="text-white text-center">veAERO</div>
              <div className="w-full px-12">
                <Image
                  src="/stats-veaero.svg"
                  alt="veAero"
                  width={1143}
                  height={214}
                  className="mt-4 mb-[-22px]"
                />
              </div>
              <div className="flex justify-between">
                <div>START</div>
                <div className="text-white">GOAL</div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-white text-center">Something else</div>
              <div className="w-full px-12">
                <Image
                  src="/stats-something-else.svg"
                  alt="something else"
                  width={1143}
                  height={214}
                  className="mt-4 mb-[-22px]"
                />
              </div>
              <div className="flex justify-between">
                <div>0%</div>
                <Image
                  src="/infinity.svg"
                  alt="infinity"
                  width={95}
                  height={102}
                  className="mt-[-14px]"
                />
              </div>
            </div>
          </div>
        </div>
        <Image
          src="/mark-4.svg"
          alt="Stage IV"
          width={190}
          height={295}
          className="mt-36"
        />
      </div>

      {/* BOTTOM FOOTER */}
      <div className="font-medium flex flex-col text-white border-t-2 py-24 pb-[200px] mt-24 w-full px-[160px] gap-10">
        <p className="text-[40px] leading-[40px]">
          Receive Updates about where Cupid Inu is heading <br />
          next!
        </p>
        <p className="text-[15px] tracking-[-2%] text-white/70">
          Just join our Community and never get left behind!
        </p>
      </div>
    </main>
  );
}
