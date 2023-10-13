import type { HourlyWeather } from "@/entities/hourlyWeather";
import type { DailyWeather } from "@/entities/dailyWeather";
import type { CurrentWeather } from "@/entities/currentWeather";

export type Slide = { daily: DailyWeather; current?: CurrentWeather; hourly?: HourlyWeather[] };

export const createSlides = (
  current: CurrentWeather,
  hourly: HourlyWeather[],
  daily: DailyWeather[],
  utcOffset: number
) => {
  const slides = daily.reduce((acc, weather) => {
    const date = weather.fxDate.getUTCDate();
    acc[date] = { daily: weather };
    return acc;
  }, {} as Record<string, Slide>);

  for (const hourlyForecast of hourly) {
    const dateObj = hourlyForecast.fxTime;
    dateObj.setUTCMinutes(dateObj.getUTCMinutes() + utcOffset);

    const date = dateObj.getUTCDate();
    const forecast = slides[date].hourly ?? [];
    forecast.push(hourlyForecast);
    slides[date].hourly = forecast;
  }

  const today = daily[0].fxDate.getUTCDate();
  slides[today].current = current;

  return daily.map((day) => slides[day.fxDate.getUTCDate()]);
};
