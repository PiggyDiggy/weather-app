import { makeAutoObservable } from "mobx";

import { searchLocationsByName } from "@/api/client";
import type { Location } from "@/entities/location";
import type { DataState } from "@/types";

export class LocationInputStore {
  constructor() {
    this.options = [];
    this.focused = false;
    this.state = "done";
    makeAutoObservable(this, {}, { autoBind: true });
  }

  options: Location[];

  private setOptions(newOptions: Location[]) {
    this.options = newOptions;
  }

  async loadOptions(suggest: string) {
    const locationName = suggest
      .split(", ")
      .map((part) => part.trim())
      .join(",");
    if (locationName.length < 2) return;

    this.setState("loading");
    try {
      const response = await searchLocationsByName({ locationName });
      this.setOptions(response);
      this.setState("done");
    } catch {
      this.setOptions([]);
      this.setState("error");
    }
  }

  focused: boolean;

  setFocused(newFocused: boolean) {
    this.focused = newFocused;
  }

  state: DataState;

  private setState(newState: DataState) {
    this.state = newState;
  }
}
