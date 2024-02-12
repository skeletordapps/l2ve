import Image from "next/image";
import Slider from "../slider";

export default function Stage4() {
  return (
    <div
      id="statistics"
      className="flex flex-col xl:flex-row justify-between w-full mt-12 sm:mt-24 xl:mt-32"
    >
      <div className="hidden xl:block" />
      <div className="flex flex-col w-full px-6 md:px-12 xl:px-20">
        {/* TITLE */}
        <div className="flex flex-col text-white leading-[50px] xl:leading-[70px] font-bold">
          <p className="text-[56px] sm:text-[66px] 2xl:text-[96px]">
            STAGE PROGRESS
          </p>
          <p className="text-[20px] sm:text-[28px] xl:text-[48px] xl:tracking-[-2px]">
            NEXT STAGE INITIATED...
          </p>
        </div>

        {/* GRAPHFICS */}
        <div className="flex flex-col font-bold text-[28px] xl:text-[48px] xl:tracking-[-4%] text-blue-love xl:max-w-[1143px] mt-20 gap-14 px-4 xl:px-0">
          <Slider title="veAERO" start={0} goal={100000} current={0} />
          <Slider title="MCap" start={0} goal={500000} current={0} />
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
