import React from "react";

import type { Weather } from "../WeatherSlider";

import style from "./style.module.css";

type Props = {
  weather: Weather;
  isActive: boolean;
};

export const WeatherWidget: React.FC<Props> = ({ weather, isActive }) => {
  const { daily, hourly, current } = weather;
  return (
    <div className={style.widget} style={isActive ? { fontWeight: "bold" } : undefined}>
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
    </div>
  );
};
