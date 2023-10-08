"use client";

import React, { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import { cx, formatTemperature, getFormattedTime } from "@/utils";
import type { HourlyWeather } from "@/entities/hourlyWeather";

import { Arrow } from "../Icons/Arrow";

import style from "./style.module.css";

type Props = {
  forecast: HourlyWeather[];
  isActiveSlide: boolean;
};

const SCROLL_MIN = 40;
const SCROLL_PRESERVED_DISTANCE = 100;

export const HourlyForecast: React.FC<Props> = ({ forecast, isActiveSlide }) => {
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const listRef = useRef<HTMLUListElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const forthButtonRef = useRef<HTMLButtonElement>(null);

  const scrollForth = () => {
    const list = listRef.current;
    if (!list) return;

    const scrollTo = Math.min(
      scrollLeft + Math.max(list.offsetWidth - SCROLL_PRESERVED_DISTANCE, SCROLL_MIN),
      list.scrollWidth - list.offsetWidth
    );
    setScrollLeft(scrollTo);
  };

  const scrollBack = () => {
    const list = listRef.current;
    if (!list) return;

    const scrollTo = Math.max(scrollLeft - Math.max(list.offsetWidth - SCROLL_PRESERVED_DISTANCE, SCROLL_MIN), 0);
    setScrollLeft(scrollTo);
  };

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    list.scrollTo({ left: scrollLeft, behavior: "smooth" });
    setShowScrollButton(scrollLeft < list.scrollWidth - list.offsetWidth);
  }, [scrollLeft]);

  const transitionClassNames = {
    enter: style["scroll-button-enter"],
    enterActive: style["scroll-button-entering"],
    exit: style["scroll-button-exit"],
    exitActive: style["scroll-button-exiting"],
  };

  return (
    <div className={style["hourly-forecast"]}>
      <CSSTransition
        classNames={transitionClassNames}
        nodeRef={backButtonRef}
        timeout={200}
        in={isActiveSlide && scrollLeft > 0}
        mountOnEnter
        unmountOnExit
      >
        <button
          ref={backButtonRef}
          onClick={scrollBack}
          className={cx(style["hourly-forecast__button"], style["hourly-forecast__button_prev"])}
        >
          <Arrow />
        </button>
      </CSSTransition>
      <ul
        ref={listRef}
        className={cx(style["hourly-forecast__list"], {
          [style["hourly-forecast_scrolled"]]: scrollLeft > 0,
          [style["hourly-forecast_scrollable"]]: showScrollButton,
        })}
      >
        {forecast.map((hour) => (
          <li className={style["hourly-forecast__item"]} key={hour.fxTime.getUTCHours()}>
            <div className={style["forecast__time"]}>{getFormattedTime(hour.fxTime)}</div>
            <i className={`qi-${hour.icon}`}></i>
            <div className={style["forecast__temp"]}>{formatTemperature(hour.temp)}</div>
          </li>
        ))}
      </ul>
      <CSSTransition
        classNames={transitionClassNames}
        in={isActiveSlide && showScrollButton}
        timeout={200}
        nodeRef={forthButtonRef}
        mountOnEnter
        unmountOnExit
      >
        <button
          ref={forthButtonRef}
          onClick={scrollForth}
          className={cx(style["hourly-forecast__button"], style["hourly-forecast__button_next"])}
        >
          <Arrow />
        </button>
      </CSSTransition>
    </div>
  );
};
