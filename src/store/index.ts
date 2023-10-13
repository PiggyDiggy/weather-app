import { makeAutoObservable } from "mobx";

import { Location } from "@/entities/location";

export class Store {
  private _location = {} as Location;

  constructor(location: Location) {
    makeAutoObservable(this);
    this.location = location;
  }

  get location() {
    return this._location;
  }

  set location(location: Location) {
    this._location = location;
  }
}
