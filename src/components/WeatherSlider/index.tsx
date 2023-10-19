"use client";

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "@/store/provider";
import { Location } from "@/entities/location";
import { Slide } from "@/utils";

import { CustomSlider } from "../CustomSlider";
import { WeatherWidget } from "../WeatherWidget";

import style from "./style.module.css";

type Props = { slides: Slide[]; location: Location };

export const WeatherSlider: React.FC<Props> = observer(({ slides, location }) => {
  const store = useStore();

  useEffect(() => {
    if (!store.locationStore.location.id) {
      store.locationInputStore.domainStore.changeLocation(location);
    }
  }, []);

  return (
    <CustomSlider length={slides.length}>
      <CustomSlider.Slides className={style["weather-slider__slides"]}>
        {slides.map((weather, i) => (
          <CustomSlider.Slide
            key={i}
            index={i}
            classname={style["weather-slider__slide"]}
            renderSlide={({ isActive }) => <WeatherWidget isActive={isActive} weather={weather} />}
          />
        ))}
      </CustomSlider.Slides>
    </CustomSlider>
  );
});
