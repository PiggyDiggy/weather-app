import { makeAutoObservable } from "mobx";

import { DataState } from "@/types";
import { buildURL, debounce, formatLocationName } from "@/utils";
import { Location } from "@/entities/location";

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

    if (newState === "done") {
      this.prefetchSelected();
    }
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

  private prefetchSelected() {
    const prefetchLocation = this.parentStore.domainStore.options[this.selectedId];
    if (prefetchLocation) {
      this.parentStore.rootStore.locationStore.router?.prefetch(buildURL(prefetchLocation));
    }
  }

  selectedId = 0;
  setSelectedId(newId: number) {
    this.selectedId = newId;

    this.prefetchSelected();
  }

  selectNextOption() {
    const optionsLength = this.parentStore.domainStore.options.length;
    this.setSelectedId(this.selectedId < optionsLength - 1 ? this.selectedId + 1 : 0);
  }

  selectPreviousOption() {
    const optionsLength = this.parentStore.domainStore.options.length;
    this.setSelectedId(
      this.selectedId === 0 || this.selectedId > optionsLength ? optionsLength - 1 : this.selectedId - 1
    );
  }

  changeLocation(location: Location) {
    if (location) {
      this.parentStore.rootStore.locationStore.location = location;
      this.setFocused(false);
      setTimeout(() => {
        this.setSelectedId(0);
      }, 200)
    }
  }

  changeLocationToSelected() {
    const options = this.parentStore.domainStore.options;
    if (this.selectedId >= options.length) {
      this.selectedId = 0;
    }
    this.changeLocation(options[this.selectedId]);
  }
}
