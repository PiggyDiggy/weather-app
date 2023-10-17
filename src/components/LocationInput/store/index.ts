import { makeAutoObservable, flowResult } from "mobx";
import { CancellablePromise } from "mobx/dist/internal";

import { searchLocationsByName } from "@/api/client";
import type { Location } from "@/entities/location";
import type { DataState } from "@/types";

export class LocationInputStore {
  constructor() {
    makeAutoObservable<LocationInputStore, "flow" | "abortController">(
      this,
      { abortController: false, flow: false },
      { autoBind: true }
    );
  }

  options: Location[] = [];

  private setOptions(newOptions: Location[]) {
    this.options = newOptions;
  }

  private flow: CancellablePromise<void> | null = null;
  private abortController: AbortController | null = null;

  loadOptions(suggest: string) {
    this.flow?.cancel();
    this.abortController?.abort();

    this.abortController = new AbortController();
    this.flow = flowResult(this.fetchOptions(suggest));
    this.flow.catch(() => {});
  }

  private *fetchOptions(suggest: string): Generator<Promise<Location[]>, void, Location[]> {
    const locationName = suggest
      .split(", ")
      .map((part) => part.trim())
      .join(",");

    this.setState("loading");
    try {
      const response = yield searchLocationsByName({
        locationName,
        fetchOptions: { signal: this.abortController?.signal },
      });
      this.setOptions(response);
      this.setState("done");
    } catch {
      this.setOptions([]);
      this.setState("error");
    }
  }

  focused = false;

  setFocused(newFocused: boolean) {
    this.focused = newFocused;
  }

  state: DataState = "done";

  private setState(newState: DataState) {
    this.state = newState;
  }
}
