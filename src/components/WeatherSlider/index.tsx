"use client";

import React from "react";

import { CurrentWeather } from "@/entities/currentWeather";
import { DailyWeather } from "@/entities/dailyWeather";
import { HourlyWeather } from "@/entities/hourlyWeather";

import { CustomSlider } from "../CustomSlider";
import { WeatherWidget } from "../WeatherWidget";

import style from "./style.module.css";

export type Weather = { daily: DailyWeather; current?: CurrentWeather; hourly?: HourlyWeather[] };

type Props = {
  slides: Weather[];
};

export const WeatherSlider: React.FC<Props> = ({ slides }) => {
  return (
    <section className={style.section}>
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
    </section>
  );
};
