import { StateContext } from "@/app/context/StateContext";
import { NFT, getOpenseaData } from "@/app/contracts/nft";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useContext, useEffect, useState } from "react";
import { useAccount, useNetwork } from "wagmi";

interface NftList {
  mobile?: boolean;
}

export default function NftList({ mobile = false }: NftList) {
  let [list, setList] = useState<NFT[] | null>(null);

  const account = useAccount();
  const { chain } = useNetwork();
  const { signer } = useContext(StateContext);

  const imageLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const onCheckNfts = useCallback(async () => {
    if (signer && chain && !chain.unsupported && account) {
      const response = await getOpenseaData(signer);
      if (response) setList(response);
    }
  }, [signer, account, chain, setList]);

  useEffect(() => {
    onCheckNfts();
  }, [signer]);

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
        <div className="hidden lg:grid grid-cols-2 gap-8 w-full max-w-[180px] mt-10 justify-end">
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
      )}
    </>
  );
}
