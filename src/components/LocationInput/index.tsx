"use client";

import React, { useState } from "react";

import { useStore } from "@/store/provider";

import { MapPin } from "../Icons/MapPin";

import style from "./style.module.css";

export const LocationInput = () => {
  const store = useStore();
  const [value, setValue] = useState(store.location.name);

  return (
    <div className={style.container}>
      <div className={style["location-input-wrapper"]}>
        <input
          className={style["location-input"]}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className={style["location-icon"]}>
          <MapPin />
        </div>
      </div>
      <button onClick={() => store.changeLocation(value)}>Change</button>
    </div>
  );
};
