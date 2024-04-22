import { StateContext } from "@/app/context/StateContext";
import Link from "next/link";
import { useContext } from "react";
import { useDisconnect } from "wagmi";

export default function Icons() {
  const { signer } = useContext(StateContext);
  const { disconnectAsync } = useDisconnect();
  return (
    <>
      {/* RIGHT */}
      <div className="hidden lg:flex flex-col w-full lg:max-w-[20%] pt-[36px]">
        {signer && (
          <div className="flex flex-col items-end w-full h-full pb-24 gap-5">
            <button
              onClick={() => disconnectAsync()}
              className="flex flex-col items-center gap-[10px]"
            >
              <div className="w-[46.48px] h-[32.18px] transition-all bg-wallet-connected-v2 hover:bg-wallet-connected-v2-hover" />
              <span className="px-[12px] transition-all bg-[#F9F9F9] hover:bg-[#F9F9F9]/80 hover:shadow-inner text-black text-[14.62px] font-bold">
                DISCONNECT
              </span>
            </button>

            <Link
              href="https://opensea.io/collection/l2ve-nft"
              target="blank"
              className="flex flex-col items-center gap-[10px]"
            >
              <div className="w-[66.48px] h-[76.48px] transition-all bg-opensea bg-no-repeat bg-cover hover:opacity-80" />
              <span className="px-[12px] transition-all bg-[#F9F9F9] hover:bg-[#F9F9F9]/80 hover:shadow-inner text-black text-[14.62px] font-bold">
                COLLECTION
              </span>
            </Link>
            {/* 
                {tokens && (
                  <div className="flex flex-col gap-8 w-full max-w-[80px] mt-10 justify-end">
                    {tokens.map((item, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <Image
                          loader={imageLoader}
                          src={item?.imageUrl || "/button.png"}
                          width={40}
                          height={40}
                          alt={item?.id?.toString() || "nft"}
                          loading="lazy"
                          className="transition-all hover:-rotate-12 border-2 border-black/20"
                        />
                        <div className="flex justify-center items-center self-center text-center mt-4 w-[79px] h-[20px] px-[12px] transition-all bg-[#F9F9F9] hover:bg-[#F9F9F9]/80 hover:shadow-inner text-black text-[14.62px] font-bold">
                          {item?.id}
                        </div>
                      </div>
                    ))}
                  </div>
                )} */}
          </div>
        )}
      </div>

      {/* RIGHT MOBILE */}
      <div className="absolute top-0 right-4 flex lg:hidden flex-col w-full pt-5 lg:pt-[36px]">
        {signer && (
          <div className="flex flex-col flex-wrap items-end w-full h-full pb-24">
            <button
              onClick={() => disconnectAsync()}
              className="flex flex-col items-center gap-[20px]"
            >
              <div className="w-[46.48px] h-[32.18px] transition-all bg-wallet-connected-v2 hover:bg-wallet-connected-v2-hover" />
              <span className="px-[12px] transition-all bg-[#F9F9F9] hover:bg-[#F9F9F9]/80 hover:shadow-inner text-black text-[14.62px] font-bold">
                DISCONECT
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
