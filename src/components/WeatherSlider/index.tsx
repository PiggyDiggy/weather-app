"use client";

import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react-lite";

import { getAllWeatherClient } from "@/api/client";
import { createSlides } from "@/utils";
import { useStore } from "@/store/provider";
import { CurrentWeather } from "@/entities/currentWeather";
import { DailyWeather } from "@/entities/dailyWeather";
import { HourlyWeather } from "@/entities/hourlyWeather";

import { CustomSlider } from "../CustomSlider";
import { WeatherWidget } from "../WeatherWidget";

import style from "./style.module.css";

type Props = { daily: DailyWeather[]; current: CurrentWeather; hourly: HourlyWeather[] };

export const WeatherSlider: React.FC<Props> = observer(({ daily, current, hourly }) => {
  const { location } = useStore();
  const [slides, setSlides] = useState(() => createSlides(current, hourly, daily, location.utcOffset));
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    getAllWeatherClient({ location: location.id })
      .then(({ currentWeather, dailyForecast, hourlyForecast }) => {
        if (!currentWeather) {
          return setSlides([]);
        }
        
        const slides = createSlides(currentWeather, hourlyForecast, dailyForecast, location.utcOffset);
        setSlides(slides);
      })
      .catch(() => setSlides([]));
  }, [location.id]);

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
});
