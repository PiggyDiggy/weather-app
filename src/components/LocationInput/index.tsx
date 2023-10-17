"use client";

import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { CSSTransition } from "react-transition-group";

import { useStore } from "@/store/provider";
import { formatLocationName } from "@/utils";

import { LocationSelect } from "../LocationSelect";
import { StateIcon } from "../StateIcon";

import { useLocationInputStore } from "./store/provider";
import style from "./style.module.css";

export const LocationInput = observer(function LocationInput() {
  const store = useStore();
  const { loadOptions, focused, setFocused, state } = useLocationInputStore();
  const [value, setValue] = useState(() => formatLocationName(store.location, false));

  useEffect(() => {
    setValue(formatLocationName(store.location, false));
  }, [focused]);

  useEffect(() => {
    let timeoutId = value.length > 1 ? setTimeout(() => {
      loadOptions(value);
    }, 250) : undefined;

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);

  return (
    <div className={style.container}>
      <CSSTransition
        classNames={{
          enter: style["backdrop_enter"],
          enterActive: style["backdrop_enter-active"],
          exit: style["backdrop_exit"],
          exitActive: style["backdrop_exit-active"],
        }}
        in={focused}
        timeout={200}
        unmountOnExit
        mountOnEnter
      >
        <div className={style.backdrop} onClick={() => setFocused(false)}></div>
      </CSSTransition>
      <div className={style["location-input-wrapper"]}>
        <input
          className={style["location-input"]}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          id="location-input"
          autoComplete="off"
        />
        <StateIcon state={state} className={style["location-icon"]} />
        <LocationSelect />
      </div>
    </div>
  );
});
