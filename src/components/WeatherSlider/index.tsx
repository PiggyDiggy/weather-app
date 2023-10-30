"use client";

import React from "react";

import { Slide } from "@/utils";

import { CustomSlider } from "../CustomSlider";
import { WeatherWidget } from "../WeatherWidget";

import style from "./style.module.css";

type Props = { slides: Slide[] };

export const WeatherSlider: React.FC<Props> = ({ slides }) => {
  return (
    <CustomSlider className={style["weather-slider"]}>
      <CustomSlider.Slides className={style["weather-slider__slides"]}>
        {slides.map((weather, i) => (
          <CustomSlider.Slide
            key={weather.daily.fxDate.getDate()}
            index={i}
            classname={style["weather-slider__slide"]}
            renderSlide={({ isActive }) => <WeatherWidget isActive={isActive} weather={weather} />}
          />
        ))}
      </CustomSlider.Slides>
    </CustomSlider>
  );
};
