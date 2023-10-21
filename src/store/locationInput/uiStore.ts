import { makeAutoObservable } from "mobx";

import { DataState } from "@/types";
import { debounce, formatLocationName } from "@/utils";

import { LocationInputStore } from ".";

export class UIStore {
  private debouncedLoadOptions;
  private parentStore: LocationInputStore;

  constructor(parentStore: LocationInputStore) {
    this.parentStore = parentStore;
    this.debouncedLoadOptions = debounce(parentStore.domainStore.loadOptions, 250);
    makeAutoObservable<UIStore, "parentStore" | "debouncedLoadOptions">(
      this,
      { parentStore: false, debouncedLoadOptions: false },
      { autoBind: true }
    );
  }

  focused = false;
  setFocused(newFocused: boolean) {
    this.focused = newFocused;
    if (!newFocused) {
      this.setInputValue(formatLocationName(this.parentStore.rootStore.locationStore.location, false));
    }
  }

  state: DataState = "done";
  setState(newState: DataState) {
    this.state = newState;
  }

  inputValue = "";
  setInputValue(newValue: string) {
    if (this.inputValue === newValue) return;

    this.inputValue = newValue;

    const [locationName, country] = newValue.split(",").map((part) => part.trim());
    if (locationName.length > 1) {
      this.debouncedLoadOptions(locationName, country);
    }
  }
}
