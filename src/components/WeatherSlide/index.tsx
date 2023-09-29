import React from "react";

import type { Slide } from "../WeatherSlider";

type Props = {
  slide: Slide;
  isActive: boolean;
};

export const WeatherSlide: React.FC<Props> = ({ slide, isActive }) => {
  const { daily, hourly, current } = slide;
  return (
    <li style={isActive ? { fontWeight: "bold" } : undefined}>
      <h2>{daily.fxDate.toLocaleString("ru-RU")}</h2>
      {current && (
        <div>
          <div>Temp {current.temp}</div>
          <div>Feels like {current.feelsLike}</div>
          <div>{current.text}</div>
        </div>
      )}
      <div>
        <div>
          From {daily.tempMin} to {daily.tempMax}
        </div>
      </div>
      {hourly && (
        <ul>
          {hourly.map((weather) => (
            <li key={weather.fxTime.getHours()}>
              <div>{weather.fxTime.toLocaleString("ru-RU")}</div>
              <div>Temp – {weather.temp}</div>
              <div>{weather.text}</div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
