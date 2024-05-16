// "use client";
// import Nav from "../components/v2/nav";
// import Image from "next/image";
// import { useCallback, useContext, useEffect, useState } from "react";
// import { StateContext } from "../context/StateContext";

// import Icons from "../components/v2/icons";
// import { useNetwork } from "wagmi";
// import {
//   Data,
//   SendType,
//   TokenInfos,
//   checkBalance,
//   sendEther,
//   tokenIsValid,
// } from "../contracts/multisender";

// export default function Home() {
//   let [loading, setLoading] = useState(false);
//   let [selected, setSelected] = useState<SendType | null>(null);
//   let [token, setToken] = useState<string | null>(null);
//   let [balance, setBalance] = useState<Number | null>(null);
//   let [inputToken, setInputToken] = useState("");
//   let [tokenInfos, setTokenInfos] = useState<TokenInfos | null>(null);
//   let [inputEtherValues, setInputEtherValues] = useState("");
//   let [inputTokenValues, setInputTokenValues] = useState("");
//   let [dataList, setDataList] = useState<Data[] | null>(null);

//   const { signer } = useContext(StateContext);
//   const { chain } = useNetwork();

//   const onTextAreaChange = (value: string, type: SendType) => {
//     let list: any = [];
//     const items = value.replaceAll("\n", "").split(",");

//     if (items.length > 0) {
//       items.forEach((lines) => {
//         const line = lines.split("=");
//         const wallet = line[0];
//         const value = line[1];
//         if (wallet && Number(value) > 0) list.push({ wallet, value });
//       });

//       if (list.length > 0) setDataList(list);
//     }

//     type === SendType.ether
//       ? setInputEtherValues(value)
//       : setInputTokenValues(value);
//   };

//   const onSend = useCallback(async () => {
//     if (dataList && dataList?.length > 0 && signer) {
//       if (selected === SendType.ether) {
//         await sendEther(dataList, signer);
//       }
//     }
//   }, [dataList, selected, signer]);

//   const onValidateToken = useCallback(async () => {
//     if (signer && token) {
//       const response: TokenInfos | null = await tokenIsValid(signer, token);
//       setTokenInfos(response);
//     }
//   }, [token, signer, setTokenInfos]);

//   useEffect(() => {
//     if (token) {
//       onValidateToken();
//     }
//   }, [token]);

//   const onCheckBalance = useCallback(async () => {
//     if (selected && signer && chain && !chain.unsupported) {
//       if (selected === SendType.ether) {
//         const response = await checkBalance(signer, selected);
//         if (response) setBalance(response);
//       } else if (selected === SendType.token && token) {
//         const response = await checkBalance(signer, selected, token);
//         if (response) setBalance(response);
//       }
//     }
//   }, [selected, signer, chain, token]);

//   useEffect(() => {
//     if (selected && signer && chain && !chain.unsupported) {
//       onCheckBalance();
//     }
//   }, [selected, signer, chain, token]);

//   return (
//     <>
//       <Nav />
//       <div className="flex flex-col relative">
//         <div className="flex flex-col lg:flex-row  lg:px-[54px] ">
//           {/* LEFT */}
//           <div className="flex items-center lg:items-start flex-col w-full text-[#0F61FF] lg:max-w-[20%] pt-[70px] lg:pt-[36px] px-4 z-20">
//             <div className="flex flex-col items-center lg:items-start">
//               <Image
//                 src="/v2/rocket.svg"
//                 width={32.03}
//                 height={60.06}
//                 alt="rocket"
//                 className="mb-[-30px]"
//               />
//               <h1 className="text-[42px]">MULTISENDER</h1>
//               <div className="flex flex-col lg:gap-4 w-[400px] pb-10">
//                 <p className="lg:mt-4 text-[24px] text-black lg:text-[28px] leading-[30px] text-center lg:text-start">
//                   CHOOSE{" "}
//                   <button
//                     onClick={() => setSelected(SendType.ether)}
//                     className={`text-[#0F61FF] hover:underline ${
//                       selected === SendType.ether ? "underline" : ""
//                     }`}
//                   >
//                     ETHER
//                   </button>{" "}
//                   OR A{" "}
//                   <button
//                     onClick={() => setSelected(SendType.token)}
//                     className={`text-[#0F61FF] hover:underline ${
//                       selected === SendType.token ? "underline" : ""
//                     }`}
//                   >
//                     TOKEN
//                   </button>{" "}
//                   TO SEND TO MUTIPLE WALLETS.
//                 </p>
//               </div>

//               {/* ETHER */}
//               {selected === SendType.ether && balance && (
//                 <div className="text-xl mt-3 text-black">
//                   Balance in Ether:{" "}
//                   {balance.toLocaleString("en-us", {
//                     minimumFractionDigits: 18,
//                   })}
//                 </div>
//               )}

//               {selected === SendType.ether &&
//                 balance &&
//                 Number(balance) > 0 && (
//                   <>
//                     <label className="text-2xl mt-10">
//                       Recipients & Amounts
//                     </label>
//                     <textarea
//                       value={inputEtherValues}
//                       onChange={(e) =>
//                         onTextAreaChange(e.target.value, selected)
//                       }
//                       className="w-[400px] h-[160px]"
//                       placeholder={`0xA19328fb05ce6FD204D16c2a2A98F7CF434c12F4=100.20,
// 0xA19328fb05ce6FD204D16c2a2A98F7CF434c12F4=100.20,
// 0xA19328fb05ce6FD204D16c2a2A98F7CF434c12F4=100.20,
// 0xA19328fb05ce6FD204D16c2a2A98F7CF434c12F4=100.20,
// ...
//                   `}
//                     />
//                   </>
//                 )}

//               {/* TOKEN */}
//               {selected === SendType.token && (
//                 <div className="flex flex-col">
//                   <label className="text-2xl">Token Address</label>
//                   <div className="flex items-center gap-3">
//                     <input
//                       placeholder="Enter token address"
//                       type="text"
//                       className="w-[300px]"
//                       value={inputToken}
//                       onChange={(e) => setInputToken(e.target.value)}
//                     />

//                     <button
//                       className="py-2 px-4 bg-blue-love text-white"
//                       onClick={() => setToken(inputToken)}
//                     >
//                       LOAD
//                     </button>
//                   </div>
//                   {tokenInfos && !tokenInfos.valid && (
//                     <span className="text-red-600">INVALID TOKEN</span>
//                   )}
//                 </div>
//               )}

//               {selected === SendType.token &&
//                 tokenInfos &&
//                 tokenInfos.valid && (
//                   <div className="text-xl mt-3 text-black">
//                     Balance in {tokenInfos.symbol}:{" "}
//                     {tokenInfos.balance.toLocaleString("en-us", {
//                       minimumFractionDigits: tokenInfos.decimals,
//                     })}
//                   </div>
//                 )}

//               {selected === SendType.token &&
//                 tokenInfos &&
//                 tokenInfos.valid &&
//                 tokenInfos.balance > 0 && (
//                   <>
//                     <label className="text-2xl mt-10">
//                       Recipients & Amounts
//                     </label>
//                     <textarea
//                       value={inputTokenValues}
//                       onChange={(e) =>
//                         onTextAreaChange(e.target.value, selected)
//                       }
//                       className="w-[400px] h-[160px]"
//                       placeholder={`0xA19328fb05ce6FD204D16c2a2A98F7CF434c12F4=100.20,
// 0xA19328fb05ce6FD204D16c2a2A98F7CF434c12F4=100.20,
// 0xA19328fb05ce6FD204D16c2a2A98F7CF434c12F4=100.20,
// 0xA19328fb05ce6FD204D16c2a2A98F7CF434c12F4=100.20,
// ...
//                   `}
//                     />
//                   </>
//                 )}

//               {dataList && (
//                 <button
//                   onClick={onSend}
//                   type="button"
//                   className={`mt-5 inline-flex justify-center items-center w-[131px] h-[33.5px] rounded-md  ${
//                     1 == 1
//                       ? "bg-button-v2-sm hover:animate-pulse"
//                       : "bg-button-v2-sm opacity-30"
//                   } text-[18px]  text-[#F0EFEF] focus:outline-none focus-visible:ring-0 `}
//                 >
//                   {loading ? "LOADING..." : "SEND"}
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* CENTER */}
//           <div className="flex flex-col items-center w-full mt-11 min-h-[100%] relative">
//             <Image
//               src="/v2/computer.svg"
//               width={756.3}
//               height={627}
//               alt="computer"
//               className="w-full lg:w-[750px] lg:h-[810px] opacity-85"
//             />
//           </div>

//           {/* RIGHT */}
//           <Icons />
//         </div>

//         {/* COPYRIGHTS */}
//         <span className="absolute bottom-[340px] lg:bottom-[140px] left-[-40px] lg:left-0 -rotate-90 text-black text-[12px]">
//           2024® ALL RIGHTS RESERVED
//         </span>
//       </div>
//     </>
//   );
// }

export default function Multisender() {
  return <></>;
}
