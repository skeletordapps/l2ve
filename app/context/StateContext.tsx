"use client";
import { usePathname, useParams } from "next/navigation";
import { useState, createContext, useEffect, ReactNode } from "react";

import { ROUTES } from "../utils/consts";

export const enum Theme {
  light = "light",
  dark = "dark",
}

export const StateContext = createContext({
  page: "/",
  setPage: (value: string) => {},
});

type Props = {
  children?: ReactNode;
};

export const StateProvider = ({ children }: Props) => {
  const pathname = usePathname();
  const params = useParams();
  const [page, setPage] = useState(ROUTES[0].href);

  useEffect(() => {
    const route = ROUTES.find((item) =>
      params.id
        ? pathname.substring(0, pathname.lastIndexOf("/")) === item.href
        : pathname === item.href
    )!;

    setPage(route.href);
  }, [pathname]);

  return (
    <StateContext.Provider
      value={{
        page,
        setPage,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
