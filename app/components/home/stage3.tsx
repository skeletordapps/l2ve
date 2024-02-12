import Image from "next/image";

export default function Stage3() {
  return (
    <>
      {/* DESKTOP */}
      <div className="hidden xl:flex justify-between w-full gap-[120px] mt-10 z-20">
        <Image src="/mark-3.svg" alt="Stage 1" width={190} height={295} />

        {/* BOXES */}
        <div className="flex flex-row font-bold text-[16px] 2xl:text-[20px] text-blue-love mt-[80px] tracking-[-1px] flex-wrap gap-[130px]">
          {/* STATE III */}
          <div className="flex items-center p-6 2xl:p-8 shadow-lg rounded-[20px] bg-white text-center max-w-[420px] 2xl:max-w-[500px] gap-8 ml-[-80px] 2xl:ml-0 mb-[-60px] xl:h-[200px] 2xl:h-auto relative">
            <div className="flex items-center justify-center">
              <Image
                src="/balls.svg"
                alt="balls"
                width={144}
                height={172.03}
                className="min-w-[104px] min-h-[132.03px] 2xl:min-w-[144px] 2xl:min-h-[172.03px]"
              />
            </div>
            <div className="flex flex-col">
              <p>
                <span className="font-bold text-[32px] 2xl:text-[48px] text-center">
                  STAGE III
                </span>
              </p>
              <p className="leading-[20px] 2xl:leading-[26px]">
                Launch on next L2. Cupid Inu will travel to the next L2 and you
                can choose where to head next!
              </p>
            </div>

            <div className="absolute top-0 left-0 bg-white/80 backdrop-blur-[5px] w-full h-full rounded-[20px] flex justify-center items-center text-[38px] 2xl:text-[48px] p-24 text-blue-love/50">
              Unveil at 500k MCap
            </div>
          </div>

          {/* SPACEMAP */}
          <div className="hidden xl:flex flex-col text-blue-love leading-[48px] 2xl:leading-[68px] items-center 2xl:mt-[-100px]">
            <p className="font-bold xl:text-[66px] 2xl:text-[96px] tracking-[-2px]">
              SPACEMAP
            </p>
            <p className="font-bold xl:text-[28px] 2xl:text-[48px]">
              TO INFINITY AND BEYOND
            </p>
          </div>

          {/* STAGE IV */}
          <div className="flex items-center p-6 2xl:p-8 shadow-lg rounded-[20px] bg-white text-center max-w-[420px] 2xl:max-w-[500px] xl:ml-[500px] 2xl:ml-[760px] xl:mt-[-50px] 2xl:mt-[-90px] xl:max-h-[200px] 2xl:max-h-[260px] 2xl:gap-8 relative">
            <div className="relative min-w-[94px] min-h-[172.03px]">
              <Image
                src="/parachute.svg"
                alt="parachute"
                width={223}
                height={223}
                className="absolute min-w-[183px] min-h-[183px] 2xl:min-w-[223px] 2xl:min-h-[223px] xl:top-[-5px] 2xl:top-[-28px] left-[-42px]"
              />
            </div>
            <div className="flex flex-col">
              <p>
                <span className="font-bold text-[32px] 2xl:text-[48px] text-center">
                  STAGE IV
                </span>
              </p>
              <p className="leading-[20px] 2xl:leading-[26px]">
                Airdrop to $L2VE Holders on BASE. 10% Airdrop Allocation on
                every new L2 Cupid Inu discovers.
              </p>
            </div>
            <div className="absolute top-0 left-0 bg-white/80 backdrop-blur-[5px] w-full h-full rounded-[20px] flex justify-center items-center text-[38px] 2xl:text-[48px] p-24 text-blue-love/50">
              Unveil at 500k MCap
            </div>
          </div>

          {/* STAGE V */}
          <div className="flex items-center p-6 2xl:p-8 shadow-lg rounded-[20px] bg-white text-center max-w-[420px] 2xl:max-w-[500px] gap-4 ml-[-120px] xl:mt-[-200px] 2xl:mt-[-240px] relative">
            <div className="flex items-center justify-center">
              <Image
                src="/infinity.svg"
                alt="infinity"
                width={156}
                height={168}
                className="min-w-[116px] min-h-[128px] 2xl:min-w-[156px] 2xl:min-h-[168px]"
              />
            </div>
            <div className="flex flex-col">
              <p>
                <span className="font-bold text-[32px] 2xl:text-[48px] text-center">
                  STAGE V
                </span>
              </p>
              <p className="leading-[20px] 2xl:leading-[26px]">
                Same Strategy. Accumulate ve3,3, provide endless APR and move on
                to next L2 with Airdrop.
              </p>
            </div>
            <div className="absolute top-0 left-0 bg-white/80 backdrop-blur-[5px] w-full h-full rounded-[20px] flex justify-center items-center text-[38px] 2xl:text-[48px] p-24 text-blue-love/50">
              Unveil at 500k MCap
            </div>
          </div>
        </div>

        {/* <div className="w-[200px]" /> */}
      </div>

      {/* MOBILE */}
      <div className="flex flex-col xl:hidden w-full mt-10 sm:mt-16 z-20">
        <div className="flex flex-col text-blue-love leading-[48px] sm:leading-[68px] px-6 sm:px-12 my-4">
          <p className="font-bold text-[56px] sm:text-[96px] tracking-[-2px]">
            SPACEMAP
          </p>
          <p className="font-bold text-[22px] sm:text-[48px]">
            TO INFINITY AND BEYOND
          </p>
        </div>

        {/* BOXES */}
        <div className="flex flex-col text-[20px] sm:text-[24px] text-blue-love sm:mt-[10px] tracking-[-1px] min-w-full p-6 sm:p-12 gap-6">
          {/* STATE III */}
          <div className="flex flex-col items-center p-8 shadow-lg rounded-[20px] bg-white sm:text-center gap-4 relative">
            <div className="flex items-center justify-between gap-4">
              <Image
                src="/balls.svg"
                alt="balls"
                width={144}
                height={172.03}
                className="w-[90px] sm:min-w-[144px] sm:min-h-[172.03px]"
              />
              <span className="font-bold text-[28px] sm:text-[48px] sm:text-center">
                STAGE III
              </span>
            </div>
            <div className="sm:hidden w-full h-[1px] bg-blue-love font-bold text-[16px]" />
            <div className="flex flex-col">
              <p className="leading-[26px]">
                Launch on next L2. Cupid Inu will travel to the next L2 and you
                can choose where to head next!
              </p>
            </div>
            <div className="absolute top-0 left-0 bg-white/80 backdrop-blur-[5px] w-full h-full rounded-[20px] flex justify-center items-center text-[38px] xl:text-[48px] xl:p-24 text-blue-love/50 text-center">
              Unveil at 500k MCap
            </div>
          </div>

          {/* STAGE IV */}
          <div className="flex flex-col items-center p-8 shadow-lg rounded-[20px] bg-white sm:text-center gap-4 relative">
            <div className="flex items-center justify-between">
              <Image
                src="/parachute.svg"
                alt="parachute"
                width={223}
                height={223}
                className="w-[143px] h-[143px] sm:min-w-[223px] sm:min-h-[223px] ml-[-20px]"
              />

              <span className="font-bold text-[28px] sm:text-[48px] sm:text-center ml-[-10px]">
                STAGE IV
              </span>
            </div>
            <div className="sm:hidden w-full h-[1px] bg-blue-love font-bold text-[16px]" />
            <div className="flex flex-col">
              <p className="leading-[26px]">
                Airdrop to $L2VE Holders on BASE. 10% Airdrop Allocation on
                every new L2 Cupid Inu discovers.
              </p>
            </div>
            <div className="absolute top-0 left-0 bg-white/80 backdrop-blur-[5px] w-full h-full rounded-[20px] flex justify-center items-center text-[38px] xl:text-[48px] xl:p-24 text-blue-love/50 text-center">
              Unveil at 500k MCap
            </div>
          </div>

          {/* STAGE V */}
          <div className="flex flex-col items-center p-8 shadow-lg rounded-[20px] bg-white sm:text-center gap-4 relative">
            <div className="flex items-center justify-between gap-4">
              <Image
                src="/infinity.svg"
                alt="infinity"
                width={156}
                height={168}
                className="w-[90px] sm:min-w-[144px] sm:min-h-[172.03px]"
              />
              <span className="font-bold text-[28px] sm:text-[48px] sm:text-center">
                STAGE V
              </span>
            </div>
            <div className="sm:hidden w-full h-[1px] bg-blue-love font-bold text-[16px]" />
            <div className="flex flex-col">
              <p className="leading-[26px]">
                Same Strategy. Accumulate ve3,3, provide endless APR and move on
                to next L2 with Airdrop.
              </p>
            </div>
            <div className="absolute top-0 left-0 bg-white/80 backdrop-blur-[5px] w-full h-full rounded-[20px] flex justify-center items-center text-[38px] xl:text-[48px] xl:p-24 text-blue-love/50 text-center">
              Unveil at 500k MCap
            </div>
          </div>
        </div>

        <div className="w-[200px]" />
      </div>
    </>
  );
}
