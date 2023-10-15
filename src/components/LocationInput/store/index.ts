import { makeAutoObservable } from "mobx";

import { searchLocationsByName } from "@/api/client";
import type { Location } from "@/entities/location";

export class LocationInputStore {
  constructor(value: string) {
    this.options = [];
    this.inputValue = value;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  inputValue: string;

  setInputValue(newValue: string) {
    this.inputValue = newValue;
  }

  options: Location[];

  private setOptions(newOptions: Location[]) {
    this.options = newOptions;
  }

  async loadOptions() {
    const locationName = this.inputValue
      .split(", ")
      .map((part) => part.trim())
      .join(",");
    if (locationName.length < 2) return;

    try {
      const response = await searchLocationsByName({ locationName });
      this.setOptions(response);
    } catch {
      this.setOptions([]);
    }
  }
}
