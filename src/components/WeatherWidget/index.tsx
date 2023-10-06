import React from "react";

import { cx, formatTemperature } from "@/utils";

import { Calendar, Sunrise, Sunset } from "../Icons";
import { HourlyForecast } from "../HourlyForecast";
import type { Weather } from "../WeatherSlider";

import style from "./style.module.css";

type Props = {
  weather: Weather;
  isActive: boolean;
};

export const WeatherWidget: React.FC<Props> = ({ weather, isActive }) => {
  const { daily, hourly, current } = weather;

  return (
    <div className={cx(style.widget, { [style.widget_active]: isActive })}>
      <h2 className={style["temp-main"]}>{current?.temp || daily.tempMax}&deg; </h2>
      <div className={style.separator} />
      <ul className={style["day-info"]}>
        <li className={style["day-info__date"]}>
          <Calendar />
          {daily.fxDate.toLocaleString("en-EN", { day: "numeric", weekday: "long", month: "long" })}
        </li>
        <li className={style["day-info__forecast"]}>
          <div className={style["day-forecast__row"]}>
            <span className={style["day-forecast__text"]}>
              <i className={cx(`qi-${daily.iconDay}`, style["day-forecast__icon"])}></i>
              {daily.textDay}
            </span>
            <span className={style["day-forecast__temp"]}>{formatTemperature(daily.tempMax)}</span>
          </div>
          <div className={style["day-forecast__row"]}>
            <span className={style["day-forecast__text"]}>
              <i className={cx(`qi-${daily.iconNight}`, style["day-forecast__icon"])}></i>
              {daily.textNight}
              {!daily.textNight.toLowerCase().includes("night") && " at night"}
            </span>
            <span className={style["day-forecast__temp"]}>{formatTemperature(daily.tempMin)}</span>
          </div>
        </li>
      </ul>
      <div className={style.separator} />
      <ul className={style.astronomy}>
        <li className={style.astronomy_item}>
          <Sunrise height={20} />
          {daily.sunrise
            ? daily.sunrise.toLocaleString("en-EN", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })
            : "No sunrise info"}
        </li>
        <li className={style.astronomy_item}>
          <Sunset height={20} />
          {daily.sunset
            ? daily.sunset.toLocaleString("en-EN", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })
            : "No sunset info"}
        </li>
      </ul>
      {hourly && (
        <>
          <div className={style.separator} />
          <HourlyForecast forecast={hourly} />
        </>
      )}
    </div>
  );
};
