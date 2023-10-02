import type { Weather } from "@/components/WeatherSlider";
import type { HourlyWeather } from "@/entities/hourlyWeather";
import type { DailyWeather } from "@/entities/dailyWeather";
import type { CurrentWeather } from "@/entities/currentWeather";

export const createSlides = (current: CurrentWeather, hourly: HourlyWeather[], daily: DailyWeather[]) => {
  const slides = daily.reduce((acc, weather) => {
    const date = weather.fxDate.getDate();
    acc[date] = { daily: weather };
    return acc;
  }, {} as Record<string, Weather>);

  for (const hourlyForecast of hourly) {
    const date = hourlyForecast.fxTime.getDate();
    const forecast = slides[date].hourly ?? [];
    forecast.push(hourlyForecast);
    slides[date].hourly = forecast;
  }

  const today = daily[0].fxDate.getDate();
  slides[today].current = current;

  return daily.map((day) => slides[day.fxDate.getDate()]);
};
