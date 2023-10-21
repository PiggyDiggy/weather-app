import { makeAutoObservable, flowResult } from "mobx";
import { CancellablePromise } from "mobx/dist/internal";

import { searchLocationsByName } from "@/api/client";
import type { Location } from "@/entities/location";

import { LocationInputStore } from ".";

export class DomainStore {
  private parentStore: LocationInputStore;

  constructor(parentStore: LocationInputStore) {
    this.parentStore = parentStore;
    makeAutoObservable<DomainStore, "flow" | "abortController" | "parentStore">(
      this,
      { abortController: false, flow: false, parentStore: false },
      { autoBind: true }
    );
  }

  options: Location[] = [];

  private setOptions(newOptions: Location[]) {
    this.options = newOptions;
  }

  private flow: CancellablePromise<void> | null = null;
  private abortController: AbortController | null = null;

  loadOptions(suggest: string, country?: string) {
    this.flow?.cancel();
    this.abortController?.abort();

    this.abortController = new AbortController();
    this.flow = flowResult(this.fetchOptions(suggest, country));
    this.flow.catch(() => {});
  }

  private *fetchOptions(locationName: string, country?: string): Generator<Promise<Location[]>, void, Location[]> {
    this.parentStore.uiStore.setState("loading");
    try {
      const response = yield searchLocationsByName({
        locationName,
        country,
        fetchOptions: { signal: this.abortController?.signal },
      });
      this.setOptions(response);
      this.parentStore.uiStore.setState("done");
    } catch {
      this.setOptions([]);
      this.parentStore.uiStore.setState("error");
    }
  }

  changeLocation(newLocation: Location) {
    this.parentStore.rootStore.locationStore.location = newLocation;
    this.parentStore.uiStore.setFocused(false);
  }
}
