import React from "react";

import { cx } from "@/utils/classname";

import { WidgetRow } from "../WidgetRow";
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
      <div className={style.widget__header}>
        <h2 className={style.date}>
          <span className={style.date__day}>{daily.fxDate.getDate()}</span> /
          <span className={style.date__month}>{daily.fxDate.toLocaleString("en-EN", { month: "2-digit" })}</span>
        </h2>
        {current && (
          <div>
            <div>
              <span>{current.temp}&deg; </span>
              <span>{current.text}</span>
            </div>
            <div>Feels like {current.feelsLike}&deg;</div>
          </div>
        )}
      </div>
      <WidgetRow>
        <WidgetRow.Group>
          <WidgetRow.GroupItem>
            <div>Max</div>
            <div>{daily.tempMax}&deg;</div>
          </WidgetRow.GroupItem>
          <WidgetRow.GroupItem>
            <div>Min</div>
            <div>{daily.tempMin}&deg;</div>
          </WidgetRow.GroupItem>
        </WidgetRow.Group>
        <WidgetRow.Group>
          <WidgetRow.GroupItem>
            <div>Sunrise</div>
            <div>{daily.sunrise}</div>
          </WidgetRow.GroupItem>
          <WidgetRow.GroupItem>
            <div>Sunset</div>
            <div>{daily.sunset}</div>
          </WidgetRow.GroupItem>
          <WidgetRow.GroupItem>
            <div>Moon phase</div>
            <div>{daily.moonPhase}</div>
          </WidgetRow.GroupItem>
        </WidgetRow.Group>
        <WidgetRow.Group>
          <WidgetRow.GroupItem>
            <div>Cloud</div>
            <div>{daily.cloud}</div>
          </WidgetRow.GroupItem>
        </WidgetRow.Group>
        {hourly && (
          <WidgetRow.Group>
            <ul style={{ padding: 0, listStyle: "none" }}>
              {hourly.map((weather) => (
                <li key={weather.fxTime.getHours()}>
                  <div>{weather.fxTime.toLocaleString("ru-RU")}</div>
                  <div>Temp – {weather.temp}</div>
                  <div>{weather.text}</div>
                </li>
              ))}
            </ul>
          </WidgetRow.Group>
        )}
      </WidgetRow>
    </div>
  );
};
