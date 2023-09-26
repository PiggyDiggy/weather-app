import React from "react";

import type { Slide } from "../WeatherSlider";

type Props = {
  slide: Slide;
  isActive: boolean;
};

export const WeatherSlide: React.FC<Props> = ({ slide, isActive }) => {
  const { type, weather } = slide;
  return (
    <li style={isActive ? { fontWeight: "bold" } : undefined}>
      {type === "current" ? (
        <div>
          <div>Temp – {weather.temp}</div>
          <div>FeelsLike – {weather.feelsLike}</div>
        </div>
      ) : type === "hour" ? (
        <div>
          {weather.fxTime} – {weather.temp} ({weather.text})
        </div>
      ) : (
        <div>
          {weather.fxDate} – From {weather.tempMin} to {weather.tempMax}
        </div>
      )}
    </li>
  );
};
