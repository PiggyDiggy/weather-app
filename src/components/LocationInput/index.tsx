"use client";

import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { CSSTransition } from "react-transition-group";

import { useStore } from "@/store/provider";
import { cx, formatLocationName } from "@/utils";

import { LocationSelect } from "../LocationSelect";
import { MapPin } from "../Icons/MapPin";

import style from "./style.module.css";

export const LocationInput = observer(function LocationInput() {
  const store = useStore();
  const [value, setValue] = useState(() => formatLocationName(store.location, false));
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setIsFocused(false);
    setValue(formatLocationName(store.location, false));
  }, [store.location.id]);

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
      <div className={style.content}>
        <div className={style["location-input-wrapper"]}>
          <input
            className={cx(style["location-input"], { [style["location-input_focused"]]: isFocused })}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={({ key }) => {
              if (key === "Enter") {
                setIsFocused(false);
              }
            }}
            id="location-input"
            autoComplete="off"
          />
          <div className={style["location-icon"]}>
            <MapPin />
          </div>
        </div>
        <LocationSelect isOpen={isFocused} suggest={value} />
      </div>
    </div>
  );
});
