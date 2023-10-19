import { RootStore } from "..";

import { DomainStore } from "./domainStore";
import { UIStore } from "./uiStore";

export class LocationInputStore {
  domainStore: DomainStore;
  uiStore: UIStore;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.domainStore = new DomainStore(this);
    this.uiStore = new UIStore(this);
  }
}
