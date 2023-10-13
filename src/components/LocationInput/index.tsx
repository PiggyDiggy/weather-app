"use client";

import React, { useEffect, useState } from "react";

import { searchLocationsByName } from "@/api/client";
import { useStore } from "@/store/provider";
import { Location } from "@/entities/location";

import { MapPin } from "../Icons/MapPin";

import style from "./style.module.css";
import { observer } from "mobx-react-lite";

const formatLocationName = (location: Location) => `${location.name}, ${location.country}`;

export const LocationInput = observer(() => {
  const store = useStore();
  const [value, setValue] = useState(() => formatLocationName(store.location));
  const [options, setOptions] = useState([] as Location[]);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      const locationName = value
        .split(", ")
        .map((part) => part.trim())
        .join(",");
      if (!locationName) return;

      searchLocationsByName({ location: locationName })
        .then((response) => {
          setOptions(response);
        })
        .catch(() => {
          setOptions([]);
        });
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);

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
      <ul>
        {options.map((option) => (
          <li
            key={option.id}
            onClick={() => {
              store.location = option;
              setValue(formatLocationName(option));
            }}
          >
            {option.name}, {option.country}
          </li>
        ))}
      </ul>
    </div>
  );
});
