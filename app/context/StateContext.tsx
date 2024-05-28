"use client";
import { usePathname, useParams } from "next/navigation";
import {
  useState,
  createContext,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useEthersProvider, useEthersSigner } from "../utils/ethers";
import { BrowserProvider, JsonRpcProvider, JsonRpcSigner } from "ethers";

import { ROUTES } from "../utils/consts";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";

export const enum Theme {
  light = "light",
  dark = "dark",
}

export const StateContext = createContext({
  page: "/",
  setPage: (value: string) => {},

  provider: null,
  setProvider: (value: JsonRpcProvider | undefined) => {},

  signer: null,
  setSigner: (value: JsonRpcSigner | undefined) => {},

  account: null,
  setAccount: (value: string | undefined) => {},

  theme: Theme.light,
  setTheme: (value: Theme) => {},

  navOpen: false,
  setNavOpen: (value: boolean) => {},
});

type Props = {
  children?: ReactNode;
};

export const StateProvider = ({ children }: Props) => {
  const pathname = usePathname();
  const params = useParams();
  const [page, setPage] = useState(ROUTES[0].href);
  const [provider, setProvider] = useState<any>(undefined);
  const [signer, setSigner] = useState<any>(undefined);
  const [account, setAccount] = useState<any>(undefined);
  const [theme, setTheme] = useState(Theme.light);
  const [navOpen, setNavOpen] = useState(false);

  const { address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  useEffect(() => {
    setAccount(address);
  }, [address]);

  const getSigner = useCallback(async () => {
    if (walletProvider) {
      const _provider = new BrowserProvider(walletProvider);
      const _signer = await _provider.getSigner();
      setProvider(_provider);
      setSigner(_signer);
    }
  }, [walletProvider]);

  useEffect(() => {
    getSigner();
  }, [walletProvider]);

  useEffect(() => {
    setPage(pathname);
    // const route = ROUTES.find((item) =>
    //   params.id
    //     ? pathname.substring(0, pathname.lastIndexOf("/")) === item.href
    //     : pathname === item.href
    // )!;

    // if (route) setPage(route.href);
  }, [pathname]);

  return (
    <StateContext.Provider
      value={{
        page,
        setPage,
        provider,
        setProvider,
        signer,
        setSigner,
        account,
        setAccount,
        theme,
        setTheme,
        navOpen,
        setNavOpen,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
