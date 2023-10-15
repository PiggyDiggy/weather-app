"use client";

import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { CSSTransition } from "react-transition-group";

import { useStore } from "@/store/provider";
import { formatLocationName } from "@/utils";

import { LocationSelect } from "../LocationSelect";
import { MapPin } from "../Icons/MapPin";

import { useLocationInputStore } from "./store/provider";
import style from "./style.module.css";

export const LocationInput = observer(function LocationInput() {
  const store = useStore();
  const { setInputValue, inputValue, loadOptions } = useLocationInputStore();
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setIsFocused(false);
  }, [store.location.id]);

  useEffect(() => {
    setInputValue(formatLocationName(store.location, false));
  }, [isFocused]);

  useEffect(() => {
    let timeoutId = setTimeout(loadOptions, 250);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue]);

  return (
    <div className={style.container}>
      <CSSTransition
        classNames={{
          enter: style["backdrop_enter"],
          enterActive: style["backdrop_enter-active"],
          exit: style["backdrop_exit"],
          exitActive: style["backdrop_exit-active"],
        }}
        in={isFocused}
        timeout={200}
        unmountOnExit
        mountOnEnter
      >
        <div className={style.backdrop} onClick={() => setIsFocused(false)}></div>
      </CSSTransition>
      <div className={style["location-input-wrapper"]}>
        <input
          className={style["location-input"]}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          id="location-input"
          autoComplete="off"
        />
        <div className={style["location-icon"]}>
          <MapPin />
        </div>
        <LocationSelect isOpen={isFocused} />
      </div>
    </div>
  );
});
