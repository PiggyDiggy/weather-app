import { makeAutoObservable } from "mobx";

import { Location } from "@/entities/location";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const initialState = {} as Location;

export class Store {
  private _location = initialState;
  private router: AppRouterInstance;

  constructor(location: Location | null, router: AppRouterInstance) {
    makeAutoObservable<Store, "_location" | "router">(this, { _location: false, router: false });
    this.location = location ?? initialState;
    this.router = router;
  }

  get location() {
    return this._location;
  }

  set location(location: Location) {
    this._location = location;
    if (this.router) {
      this.router.push(`/${location.id}`);
    }
  }
}
