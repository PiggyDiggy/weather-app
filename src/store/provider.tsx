"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";

import type { Location } from "@/entities/location";

import { Store } from ".";

const StoreContext = React.createContext<Store>({} as Store);

type ProviderProps = React.PropsWithChildren<{ location: Location | null }>;

export const StoreProvider: React.FC<ProviderProps> = ({ children, location }) => {
  const router = useRouter();
  return <StoreContext.Provider value={new Store(location, router)}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
