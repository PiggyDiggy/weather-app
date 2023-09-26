"use client";

import React, { useState } from "react";

import { CurrentWeather, DailyWeather, HourlyWeather } from "@/entities";

import { WeatherSlide } from "../WeatherSlide";

export type Slide =
  | {
      type: "current";
      weather: CurrentWeather;
    }
  | {
      type: "hour";
      weather: HourlyWeather;
    }
  | {
      type: "day";
      weather: DailyWeather;
    };

type Props = {
  slides: Slide[];
};

export const WeatherSlider: React.FC<Props> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div>
      <div>
        <button onClick={() => setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)}>-</button>
        <button onClick={() => setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)}>+</button>
      </div>
      <ul>
        {slides.map((slide, i) => (
          <WeatherSlide key={i} slide={slide} isActive={i === currentSlide} />
        ))}
      </ul>
    </div>
  );
};
