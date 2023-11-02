import { makeAutoObservable } from "mobx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

import { Location } from "@/entities/location";
import { DataState } from "@/types";
import { buildURL } from "@/utils";

import { RootStore } from "..";

const initialState = {} as Location;

export class LocationStore {
  private _location = initialState;
  private _state: DataState = "loading";
  router?: AppRouterInstance;
  rootStore: RootStore;

  constructor(router: AppRouterInstance, rootStore: RootStore) {
    this.rootStore = rootStore;
    this.router = router;
    makeAutoObservable<LocationStore, "router" | "rootStore">(this, {
      router: false,
      rootStore: false,
    });
  }

  get location() {
    return this._location;
  }

  set location(location: Location) {
    const urlString = buildURL(location);
    if (!this._location.id) {
      this.router?.replace(urlString);
    } else if (this._location.id !== location.id) {
      this.router?.push(urlString);
    }

    this._location = location;
    this.state = "done";
  }

  get state() {
    return this._state;
  }

  set state(newState: DataState) {
    this._state = newState;
  }
}
