"use client";

import React, { useContext } from "react";

import { useStore } from "@/store/provider";
import { formatLocationName } from "@/utils";

import { LocationInputStore } from ".";

const StoreContext = React.createContext<LocationInputStore>({} as LocationInputStore);

type ProviderProps = React.PropsWithChildren;

export const LocationInputStoreProvider: React.FC<ProviderProps> = ({ children }) => {
  const { location } = useStore();

  return (
    <StoreContext.Provider value={new LocationInputStore(formatLocationName(location, false))}>
      {children}
    </StoreContext.Provider>
  );
};

export const useLocationInputStore = () => useContext(StoreContext);
