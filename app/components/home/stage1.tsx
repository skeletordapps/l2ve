import Image from "next/image";
import Link from "next/link";

export default function Stage1() {
  return (
    <div className="flex justify-center lg:justify-between w-full mt-4 lg:mt-10 relative">
      <Image
        src="/mark-1.svg"
        alt="Stage 1"
        width={190}
        height={295}
        className="hidden xl:block dark:hue-rotate-[200deg] dark:invert"
      />
      <div className="flex flex-col w-full px-6 sm:px-14 xl:px-0 xl:max-w-[405px] 2xl:max-w-[505px] justify-center z-20">
        {/* TITLE */}
        <div className="flex flex-col text-blue-love dark:text-dark-love leading-[80px] sm:leading-[90px]">
          <p className="font-medium text-[38px] xl:text-[44px] 2xl:text-[64px]">
            ALL YOU NEED IS
          </p>
          <p className="font-bold text-[96px] tracking-[-2px]">L2 + VE</p>
        </div>
        {/* DESCRIPTION */}
        <div className="flex flex-col gap-10 font-medium text-[20px] text-blue-love dark:text-dark-love/70 mt-[40px]">
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
          <Link
            target="blank"
            href="https://medium.com/@L2veofficial"
            className="flex items-center justify-center h-[56px] rounded-[10px] shadow-black/25 shadow-md font-semibold text-[14px] tracking-[3px] bg-blue-love dark:bg-dark-love text-white px-6 transition-all hover:scale-[1.03]"
          >
            MEDIUM
          </Link>
          <Link
            target="blank"
            href="https://aerodrome.finance/swap?from=eth&to=0xa19328fb05ce6fd204d16c2a2a98f7cf434c12f4"
            className="flex items-center justify-center h-[56px] rounded-[10px] shadow-black/25 shadow-md font-semibold text-[14px] tracking-[3px] bg-white dark:bg-[#11151E] text-blue-love dark:text-dark-love px-6  transition-all hover:scale-[1.03]"
          >
            BUY $L2VE
          </Link>
          <Link
            target="blank"
            href="https://dexscreener.com/base/0x253da544f498b85429f6acdc6e98b36b36c1c824"
            className="flex items-center justify-center h-[56px] rounded-[10px] shadow-black/25 shadow-md font-semibold text-[14px] tracking-[3px] bg-white dark:bg-[#11151E] text-blue-love dark:text-dark-love px-6  transition-all hover:scale-[1.03]"
          >
            CHART
          </Link>
        </div>
      </div>
      <Image
        src="/mascout.svg"
        alt="Mascout"
        width={592}
        height={775}
        className="hidden lg:block dark:hue-rotate-[15deg]"
      />
      <Image
        src="/mascout.svg"
        alt="Mascout"
        width={592}
        height={775}
        className="absolute top-0 right-0 lg:hidden z-0 opacity-20 dark:hue-rotate-[15deg]"
      />
    </div>
  );
}
