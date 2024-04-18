"use client";
import { VT323 } from "next/font/google";
import "./globals.css";
import StateProvider from "../app/context/StateContext";
import "@rainbow-me/rainbowkit/styles.css";

import {
  RainbowKitProvider,
  AvatarComponent,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  walletConnectWallet,
  injectedWallet,
  coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { base } from "wagmi/chains";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";
import Image from "next/image";
// import { defineChain } from "viem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// export const localhost = /*#__PURE__*/ defineChain({
//   id: 31337,
//   name: "Localhost",
//   network: "localhost",
//   nativeCurrency: {
//     decimals: 18,
//     name: "Ether",
//     symbol: "ETH",
//   },
//   rpcUrls: {
//     default: { http: ["http://127.0.0.1:8545"] },
//     public: { http: ["http://127.0.0.1:8545"] },
//   },
// });

const walletConnectId = "bf9ad4133ecde7abdc33300ab3e68895";

const { chains, publicClient } = configureChains(
  [base],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: process.env.NEXT_PUBLIC_RPC_HTTPS as string,
        webSocket: process.env.NEXT_PUBLIC_RPC_WSS as string,
      }),
    }),
    // jsonRpcProvider({
    //   rpc: (chain) => ({
    //     http:
    //       chain !== base
    //         ? localhost.rpcUrls.default.http.toString()
    //         : (process.env.NEXT_PUBLIC_RPC_HTTPS as string),
    //     webSocket:
    //       chain !== base
    //         ? localhost.rpcUrls.default.http.toString()
    //         : (process.env.NEXT_PUBLIC_RPC_WSS as string),
    //   }),
    // }),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Wallets",
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({
        chains: chains,
        projectId: walletConnectId,
      }),
      walletConnectWallet({
        projectId: walletConnectId,
        chains,
      }),
      coinbaseWallet({
        appName: "L2VE DAPP",
        chains,
      }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  return ensImage ? (
    <Image src={ensImage} width={size} height={size} alt="avatar" />
  ) : (
    <Image src={"/avatar.png"} width={size} height={size} alt="avatar" />
  );
};

const vt323 = VT323({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>L2VE</title>
        <meta
          name="description"
          content="Cupid Inu has landed on BASE! His mission is to scatter as much $L2VE as possible. For this mission he travels from one L2 blockchain to the next."
          key="desc"
        />
      </head>
      <body className={`flex flex-col bg-v2 relative ${vt323.className}`}>
        <div className="flex w-full h-full absolute top-0 left-0">
          <div className="relative w-screen h-screen">
            <Image src="/tv.gif" fill alt="tv" className="opacity-[0.07]" />
          </div>
        </div>
        <ToastContainer theme="dark" />
        <div className="flex flex-col w-full max-w-[1800px] xl:self-center">
          <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains} avatar={CustomAvatar}>
              <StateProvider>{children}</StateProvider>
            </RainbowKitProvider>
          </WagmiConfig>
        </div>
      </body>
    </html>
  );
}
