import { CurrentWeather, DailyWeather, HourlyWeather } from "@/entities";
import type { Slide } from "@/components/WeatherSlider";

export const createSlides = (current: CurrentWeather, hourly: HourlyWeather[], daily: DailyWeather[]) => {
  const slides: Slide[] = [{ type: "current", weather: current }];

  for (const hourForecast of hourly) {
    slides.push({ type: "hour", weather: hourForecast });
  }

  for (const dailyForecast of daily) {
    slides.push({ type: "day", weather: dailyForecast });
  }

  return slides;
};
