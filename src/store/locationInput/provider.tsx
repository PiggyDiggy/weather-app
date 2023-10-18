"use client";

import React, { useContext } from "react";

import { LocationInputStore } from ".";

const StoreContext = React.createContext<LocationInputStore>({} as LocationInputStore);

type ProviderProps = React.PropsWithChildren;

export const LocationInputStoreProvider: React.FC<ProviderProps> = ({ children }) => {
  return <StoreContext.Provider value={new LocationInputStore()}>{children}</StoreContext.Provider>;
};

export const useLocationInputStore = () => useContext(StoreContext);
