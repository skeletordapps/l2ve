import Image from "next/image";

export default function Stage5() {
  return (
    <div
      id="tokenomics"
      className="flex flex-col justify-between w-full mt-12 mt-24 xl:mt-32"
    >
      <div className="flex flex-col xl:flex-row justify-between w-full">
        <Image
          src="/mark-5.svg"
          alt="Stage V"
          width={190}
          height={295}
          className="hidden xl:block mt-36"
        />
        <div className="hidden xl:block w-full" />
        <div className="flex flex-col w-full px-6 md:px-12 2xl:pr-[300px]">
          {/* TITLE */}
          <div className="flex flex-col text-white leading-[40px] xl:leading-[70px] font-bold">
            <p className="text-[46px] xl:text-[96px]">TOKENOMICS</p>
            <p className="text-[20px] sm:text-[28px] xl:text-[48px] xl:tracking-[-2px]">
              PEOPLE LIE, NUMBERS DON'T
            </p>
          </div>
        </div>
      </div>
      {/* GRAPHFICS */}
      <div className="flex flex-col justify-center items-center font-bold text-[28px] xl:text-[48px] xl:tracking-[-4%] text-blue-love mt-10 xl:mt-[-200px] gap-14 px-4 xl:px-0 pb-10">
        <Image src="/chart.png" alt="Stage V" width={1159} height={490} />
      </div>
    </div>
  );
}
