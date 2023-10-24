import React from "react";

import { cx, formatTemperature, getFormattedTime, Slide } from "@/utils";

import { Calendar, Sunrise, Sunset } from "../Icons";
import { HourlyForecast } from "../HourlyForecast";

import style from "./style.module.css";

type Props = {
  weather: Slide;
  isActive: boolean;
};

export const WeatherWidget: React.FC<Props> = ({ weather, isActive }) => {
  const { daily, hourly, current } = weather;

  return (
    <div
      className={cx(style.widget, { [style.widget_active]: isActive, [style["widget_with-hourly-forecast"]]: hourly })}
    >
      <h2 className={style["temp-main"]}>{current?.temp ?? daily.tempMax}&deg; </h2>
      <div className={style.separator} />
      <ul className={style["day-info"]}>
        <li className={style["day-info__date"]}>
          <Calendar className={style["calendar-icon"]} />
          <span>{daily.fxDate.toLocaleString("en-EN", { day: "numeric", weekday: "long", month: "long" })}</span>
          {current && <span className={style["feels-like"]}>Feels like {current.feelsLike}&deg;</span>}
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
        <li className={style.astronomy__item}>
          <Sunrise height={20} className={style["astronomy__item-icon"]} />
          {daily.sunrise ? getFormattedTime(daily.sunrise) : "No sunrise info"}
        </li>
        <li className={style.astronomy__item}>
          <Sunset height={20} className={style["astronomy__item-icon"]} />
          {daily.sunset ? getFormattedTime(daily.sunset) : "No sunset info"}
        </li>
      </ul>
      {hourly && (
        <>
          <div className={style.separator} />
          <HourlyForecast className={style["hourly-forecast"]} isActiveSlide={isActive} forecast={hourly} />
        </>
      )}
    </div>
  );
};
