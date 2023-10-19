"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";

import { RootStore } from ".";

const StoreContext = React.createContext<RootStore>({} as RootStore);

type ProviderProps = React.PropsWithChildren;

export const RootStoreProvider: React.FC<ProviderProps> = ({ children }) => {
  const router = useRouter();

  return <StoreContext.Provider value={new RootStore(router)}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
