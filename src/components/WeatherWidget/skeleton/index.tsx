import React from "react";

import { Glare } from "@/components/Glare";
import { cx } from "@/utils";

import style from "./style.module.css";

type Props = {
  index: number;
};

export const WeatherWidgetSkeleton: React.FC<Props> = ({ index }) => {
  return (
    <div className={cx(style["widget-skeleton"], { [style["widget-skeleton_first"]]: index === 0 })}>
      <Glare inProp className={style["widget-skeleton__glare"]} />
    </div>
  );
};
