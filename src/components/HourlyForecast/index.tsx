import React from "react";

import { formatTemperature } from "@/utils";
import type { HourlyWeather } from "@/entities/hourlyWeather";

import style from "./style.module.css";

type Props = {
  forecast: HourlyWeather[];
};

export const HourlyForecast: React.FC<Props> = ({ forecast }) => {
  return (
    <ul className={style["hourly-forecast"]}>
      {forecast.map((hour) => (
        <li className={style["hourly-forecast__item"]} key={hour.fxTime.getUTCHours()}>
          <div className={style["forecast__time"]}>
            {hour.fxTime.toLocaleString("en-GB", {
              minute: "2-digit",
              hour: "2-digit",
              hour12: false,
              timeZone: "UTC",
            })}
          </div>
          <i className={`qi-${hour.icon}`}></i>
          <div className={style["forecast__temp"]}>{formatTemperature(hour.temp)}</div>
        </li>
      ))}
    </ul>
  );
};
