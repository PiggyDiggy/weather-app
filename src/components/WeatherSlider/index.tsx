"use client";

import React from "react";

import { CurrentWeather, DailyWeather, HourlyWeather } from "@/entities";

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
        <CustomSlider.SlidesWrapper>
          <CustomSlider.Button type="decrement">{"<"}</CustomSlider.Button>
          <CustomSlider.Slides>
            {slides.map((weather, i) => (
              <CustomSlider.Slide
                key={i}
                index={i}
                renderSlide={({ isActive }) => <WeatherWidget isActive={isActive} weather={weather} />}
              />
            ))}
          </CustomSlider.Slides>
          <CustomSlider.Button type="increment">{">"}</CustomSlider.Button>
        </CustomSlider.SlidesWrapper>
        <CustomSlider.Navigation />
      </CustomSlider>
    </section>
  );
};
