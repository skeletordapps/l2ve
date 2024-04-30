import { StateContext } from "@/app/context/StateContext";
import { NFT, getOpenseaData } from "@/app/contracts/nft";
import { getOpenseaDataForPublic } from "@/app/contracts/publicNft";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useContext, useEffect, useState } from "react";
import { useAccount, useNetwork } from "wagmi";

interface NftList {
  list: NFT[] | null;
  mobile?: boolean;
}

export default function NftList({ list, mobile = false }: NftList) {
  const imageLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      {mobile ? (
        <div className="flex lg:hidden items-center  gap-8 w-full my-10 justify-center px-10 flex-wrap">
          {list &&
            list.map((item: NFT, index) => (
              <Link
                href={item.opensea_url}
                target="blank"
                key={index}
                className="flex flex-col items-center"
              >
                <Image
                  loader={imageLoader}
                  src={item?.image_url || "/button.png"}
                  width={60}
                  height={60}
                  alt={item?.identifier || "nft"}
                  loading="lazy"
                  className="transition-all hover:-rotate-12 border-2 border-black/20"
                />
                <div className="flex justify-center items-center self-center text-center mt-4 w-[79px] h-[20px] px-[12px] transition-all bg-[#F9F9F9] hover:bg-[#F9F9F9]/80 hover:shadow-inner text-black text-[14.62px] font-bold">
                  {item?.identifier}
                </div>
              </Link>
            ))}
        </div>
      ) : (
        <div className="hidden lg:grid grid-cols-3 gap-8 w-full max-w-[280px] mt-12 justify-end z-20">
          {list &&
            list.map((item: NFT, index) => (
              <Link
                href={item.opensea_url}
                target="blank"
                key={index}
                className="flex flex-col items-center"
              >
                <Image
                  loader={imageLoader}
                  src={item?.image_url || "/button.png"}
                  width={60}
                  height={60}
                  alt={item?.identifier || "nft"}
                  loading="lazy"
                  className="w-[60px] h-[60px] transition-all hover:-rotate-12 border-2 border-black/20"
                />
                <div className="flex justify-center items-center self-center text-center mt-4 w-[79px] h-[20px] px-[12px] transition-all bg-[#F9F9F9] hover:bg-[#F9F9F9]/80 hover:shadow-inner text-black text-[14.62px] font-bold">
                  {item?.identifier}
                </div>
              </Link>
            ))}
        </div>
      )}
    </>
  );
}
