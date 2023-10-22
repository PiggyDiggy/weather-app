"use client";

import React from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "@/store/provider";
import { cx } from "@/utils";

import { LocationSelect } from "../LocationSelect";
import { StateIcon } from "../StateIcon";
import { Backdrop } from "../Backdrop";
import { Glare } from "../Glare";

import style from "./style.module.css";

export const LocationInput = observer(function LocationInput() {
  const { locationStore, locationInputStore } = useStore();
  const { focused, setFocused, inputValue, setInputValue } = locationInputStore.uiStore;

  const loading = locationStore.state === "loading";

  return (
    <div className={style.container}>
      <Backdrop inProp={focused} onClick={() => setFocused(false)} />
      <div className={cx(style.content, { [style["location-input_loading"]]: loading })}>
        <Glare inProp={loading} />
        <div className={style["location-input-wrapper"]}>
          <input
            className={style["location-input"]}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setFocused(true)}
            autoComplete="off"
            disabled={loading}
          />
          <LocationSelect />
        </div>
        <StateIcon className={style["location-icon"]} />
      </div>
    </div>
  );
});
