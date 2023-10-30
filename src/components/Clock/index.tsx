"use client";

import React, { useEffect, useState } from "react";

import { getFormattedTime } from "@/utils";
import { Location } from "@/entities/location";

import style from "./style.module.css";

type Props = {
  location: Location;
};

export const Clock: React.FC<Props> = ({ location }) => {
  const [time, setTime] = useState(() => getFormattedTime(new Date(), location.tz));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getFormattedTime(new Date(), location.tz));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [location.tz]);

  return <div className={style.clock}>{time}</div>;
};
