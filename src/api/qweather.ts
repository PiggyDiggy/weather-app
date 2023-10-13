import { RawLocation, Location, normalizeLocation } from "@/entities/location";
import { RawCurrentWeather, CurrentWeather, normalizeCurrentWeather } from "@/entities/currentWeather";
import { RawDailyWeather, DailyWeather, normalizeDailyWeatherArray } from "@/entities/dailyWeather";
import { RawHourlyWeather, HourlyWeather, normalizeHourlyWeatherArray } from "@/entities/hourlyWeather";

import { method } from ".";

const WEATHER_URL = "https://devapi.qweather.com/v7/weather";
const BASE_PARAMS = { key: process.env.API_KEY as string, lang: "en" };

type Response<T> = ({ code: "200" } & T) | { code: "400" | "401" | "402" | "403" | "404" | "429" | "500" };

type Params = {
  location: string;
};

function qWeatherMethod<T, R>({ path, params, fetchOptions, process }: Parameters<typeof method<Response<T>, R>>[0]) {
  const allParams = { ...BASE_PARAMS, ...params };
  return method<Response<T>, R>({ path, params: allParams, fetchOptions, process });
}

export function getCurrentWeather({ location }: Params) {
  return qWeatherMethod<{ now: RawCurrentWeather }, CurrentWeather | null>({
    path: `${WEATHER_URL}/now`,
    params: { location },
    fetchOptions: { next: { revalidate: 10 * 60 } },
    process(response) {
      if (response.code !== "200") {
        return null;
      }

      return normalizeCurrentWeather(response.now);
    },
  });
}

export function getLocationByName({ location }: Params) {
  return qWeatherMethod<{ location: RawLocation[] }, Location | null>({
    path: "https://geoapi.qweather.com/v2/city/lookup",
    params: { location },
    process(response) {
      if (response.code !== "200") {
        return null;
      }
      return normalizeLocation(response.location[0]);
    },
  });
}

export function getDailyForecast({ location }: Params) {
  return qWeatherMethod<{ daily: RawDailyWeather[] }, DailyWeather[]>({
    path: `${WEATHER_URL}/7d`,
    params: { location },
    fetchOptions: { next: { revalidate: 1 * 3600 } },
    process(response) {
      if (response.code !== "200") {
        return [];
      }

      return normalizeDailyWeatherArray(response.daily);
    },
  });
}

export function getHourlyForecast({ location }: Params) {
  return qWeatherMethod<{ hourly: RawHourlyWeather[] }, HourlyWeather[]>({
    path: `${WEATHER_URL}/24h`,
    params: { location },
    fetchOptions: { next: { revalidate: 1 * 3600 } },
    process(response) {
      if (response.code !== "200") {
        return [];
      }

      return normalizeHourlyWeatherArray(response.hourly);
    },
  });
}

export async function getAllWeather({ location }: Params) {
  const [currentWeather, dailyForecast, hourlyForecast] = await Promise.all([
    getCurrentWeather({ location }).catch(() => null),
    getDailyForecast({ location }).catch(() => [] as DailyWeather[]),
    getHourlyForecast({ location }).catch(() => [] as HourlyWeather[]),
  ]);

  return { currentWeather, dailyForecast, hourlyForecast };
}
