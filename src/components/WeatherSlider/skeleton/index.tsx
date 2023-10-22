import { WeatherWidgetSkeleton } from "@/components/WeatherWidget/skeleton";

import style from "./style.module.css";

export const WeatherSliderSkeleton = () => {
  return (
    <ul className={style["weather-slider-skeleton"]}>
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <li key={i} className={style["weather-slider-skeleton__slide"]}>
            <WeatherWidgetSkeleton index={i} />
          </li>
        ))}
    </ul>
  );
};
