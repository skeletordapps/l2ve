export type route = { title: string; href: string };
export const ROUTES: route[] = [
  {
    title: "ABOUT $L2VE",
    href: "/v1",
  },
  {
    title: "SPACEMAP",
    href: "/v1/#spacemap",
  },
  {
    title: "PROGRESS",
    href: "/v1/#progress",
  },
  {
    title: "TOKENOMICS",
    href: "/v1/#tokenomics",
  },
  {
    title: "L2VE FLIP",
    href: "/v1/flip",
  },
];

export type social = { title: string; href: string; src: string };

export const EXPLORER_LINKS: { [key: string]: string } = {
  31337: "https://localhost/tx/",
  8453: "https://basescan.org/tx/",
};

export const CONTRACTS = {
  // l2ve: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  // flipCoin: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  l2ve: "0xA19328fb05ce6FD204D16c2a2A98F7CF434c12F4",
  flipCoin: "0xC9835DC828292796be5b06325db4F69fb65024c3",
};
