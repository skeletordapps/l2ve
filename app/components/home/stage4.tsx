import Image from "next/image";

export default function Stage4() {
  return (
    <div
      id="statistics"
      className="flex flex-col xl:flex-row justify-between w-full mt-12 sm:mt-24 xl:mt-32"
    >
      <div className="hidden xl:block xl:w-[200px]" />
      <div className="flex flex-col w-full px-6 md:px-12 xl:px-20 2xl:px-0">
        {/* TITLE */}
        <div className="flex flex-col text-white leading-[40px] sm:leading-[50px] xl:leading-[70px] font-bold">
          <p className="text-[56px] sm:text-[66px] xl:text-[96px]">
            STATISTICS
          </p>
          <p className="text-[20px] sm:text-[28px] xl:text-[48px] xl:tracking-[-2px]">
            PEOPLE LIE, NUMBERS DON'T
          </p>
        </div>

        {/* GRAPHFICS */}
        <div className="flex flex-col font-bold text-[28px] xl:text-[48px] xl:tracking-[-4%] text-blue-love xl:max-w-[1143px] mt-20 gap-14">
          <div className="flex flex-col">
            <div className="text-white text-center">veAERO</div>
            <div className="w-full xl:px-12">
              <Image
                src="/stats-veaero.svg"
                alt="veAero"
                width={1143}
                height={214}
                className="mt-4 xl:mb-[-22px]"
              />
            </div>
            <div className="flex justify-between">
              <div>START</div>
              <div className="text-white">GOAL</div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-white text-center">Something else</div>
            <div className="w-full xl:px-12">
              <Image
                src="/stats-something-else.svg"
                alt="something else"
                width={1143}
                height={214}
                className="mt-4 xl:mb-[-22px]"
              />
            </div>
            <div className="flex justify-between">
              <div>0%</div>
              <Image
                src="/infinity.svg"
                alt="infinity"
                width={95}
                height={102}
                className="mt-[-14px] w-[65px] h-[72px] xl:w-[95px] xl:h-[102px]"
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
        className="hidden xl:block mt-36"
      />
    </div>
  );
}
