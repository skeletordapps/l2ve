"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import StateProvider from "./context/StateContext";
import Nav from "./components/nav";

import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
  AvatarComponent,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { base } from "wagmi/chains";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";
import Image from "next/image";
import { defineChain } from "viem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const localhost = /*#__PURE__*/ defineChain({
  id: 31337,
  name: "Localhost",
  network: "localhost",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] },
    public: { http: ["http://127.0.0.1:8545"] },
  },
});

const { chains, publicClient } = configureChains(
  [base],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http:
          chain.id === 31337
            ? localhost.rpcUrls.default.http.toString()
            : (process.env.NEXT_PUBLIC_RPC_HTTPS as string),
        webSocket:
          chain.id === 31337
            ? localhost.rpcUrls.default.http.toString()
            : (process.env.NEXT_PUBLIC_RPC_WSS as string),
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "L2VE",
  projectId: "bf9ad4133ecde7abdc33300ab3e68895",
  chains,
});

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

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
      <body
        className={`flex flex-col bg-gradient-to-b bg-no-repeat from-white dark:from-[#11151E] to-blue-love dark:to-blue-900 ${poppins.className}`}
      >
        <ToastContainer theme="dark" />
        <div className="flex flex-col bg-main bg-cover bg-no-repeat bg-center-top w-full max-w-[1800px] xl:self-center">
          <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains} avatar={CustomAvatar}>
              <StateProvider>
                <Nav />
                {children}
              </StateProvider>
            </RainbowKitProvider>
          </WagmiConfig>
        </div>
      </body>
    </html>
  );
}
