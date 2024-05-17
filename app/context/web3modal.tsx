"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { ReactNode } from "react";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "946d05f75ca1f092356e4694afe6175b";

// 2. Set chains
const base = {
  chainId: 8453,
  name: "Base",
  currency: "ETH",
  explorerUrl: "https://basescan.org",
  rpcUrl: process.env.NEXT_PUBLIC_RPC_HTTPS as string,
};

// 3. Create a metadata object
const metadata = {
  name: "L2VE",
  description:
    "Cupid Inu has landed on BASE! His mission is to scatter as much $L2VE as possible. For this mission he travels from one L2 blockchain to the next.",
  url: "https://dapp.l2ve.me", // origin must match your domain & subdomain
  icons: ["https://dapp.l2ve.me/v2/heart.svg"],
};
// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: process.env.NEXT_PUBLIC_RPC_HTTPS as string, // used for the Coinbase SDK
  defaultChainId: 8453, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [base],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

export function Web3Modal({ children }: { children: ReactNode }) {
  return children;
}
