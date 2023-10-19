import { makeAutoObservable } from "mobx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

import { Location } from "@/entities/location";

import { RootStore } from "..";

const initialState = {} as Location;

export class LocationStore {
  private _location = initialState;
  private router: AppRouterInstance;
  rootStore: RootStore;

  constructor(router: AppRouterInstance, rootStore: RootStore) {
    this.rootStore = rootStore;
    this.router = router;
    makeAutoObservable<LocationStore, "_location" | "router" | "rootStore">(this, {
      _location: false,
      router: false,
      rootStore: false,
    });
  }

  get location() {
    return this._location;
  }

  set location(location: Location) {
    const urlString = `/${encodeURIComponent(location.name)}?id=${location.id}`;
    if (!this._location.id) {
      this.router?.replace(urlString);
    } else {
      this.router?.push(urlString);
    }

    this._location = location;
  }
}
