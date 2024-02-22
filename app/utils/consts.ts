export type route = { title: string; href: string };
export const ROUTES: route[] = [
  {
    title: "ABOUT $L2VE",
    href: "/",
  },
  {
    title: "SPACEMAP",
    href: "/#spacemap",
  },
  {
    title: "PROGRESS",
    href: "/#progress",
  },
  {
    title: "TOKENOMICS",
    href: "/#tokenomics",
  },
  {
    title: "L2VE FLIP",
    href: "/flip",
  },
];

export type social = { title: string; href: string; src: string };

export const EXPLORER_LINKS: { [key: string]: string } = {
  31337: "https://localhost/tx/",
  8543: "https://basescan.org/tx/",
};

export const CONTRACTS = {
  l2ve: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  flipCoin: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
};
