"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import { CSSTransition } from "react-transition-group";

import { useStore } from "@/store/provider";

import { LocationSelect } from "../LocationSelect";
import { StateIcon } from "../StateIcon";

import style from "./style.module.css";

export const LocationInput = observer(function LocationInput() {
  const store = useStore();
  const { focused, setFocused, inputValue, setInputValue } = store.locationInputStore.uiStore;

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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setFocused(true)}
          autoComplete="off"
        />
        <StateIcon className={style["location-icon"]} />
        <LocationSelect />
      </div>
    </div>
  );
});
