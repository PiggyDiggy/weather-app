import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";


import { LocationStore } from "./location";
import { LocationInputStore } from "./locationInput";

export class RootStore {
  locationStore: LocationStore;
  locationInputStore: LocationInputStore;

  constructor(router: AppRouterInstance) {
    this.locationInputStore = new LocationInputStore(this);
    this.locationStore = new LocationStore(router, this);
  }
}
