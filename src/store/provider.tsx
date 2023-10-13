"use client";

import React, { useContext } from "react";

import type { Location } from "@/entities/location";

import { Store } from ".";

const StoreContext = React.createContext<Store>({} as Store);

type ProviderProps = React.PropsWithChildren<{ location: Location }>;

export const StoreProvider: React.FC<ProviderProps> = ({ children, location }) => {
  return <StoreContext.Provider value={new Store(location)}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
