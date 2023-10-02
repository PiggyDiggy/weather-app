import { RawLocation, Location, normalizeLocation } from "@/entities/location";
import { RawCurrentWeather, CurrentWeather, normalizeCurrentWeather } from "@/entities/currentWeather";
import { RawDailyWeather, DailyWeather, normalizeDailyWeatherArray } from "@/entities/dailyWeather";
import { RawHourlyWeather, HourlyWeather, normalizeHourlyWeatherArray } from "@/entities/hourlyWeather";

const WEATHER_URL = "https://devapi.qweather.com/v7/weather";
const BASE_PARAMS = { key: process.env.API_KEY as string, lang: "en" };

type Params = {
  location: string;
};

type Response<T> = ({ code: "200" } & T) | { code: "400" | "401" | "402" | "403" | "404" | "429" | "500" };

async function requestData<T, R = Response<T>>({
  path,
  params,
  fetchOptions,
  process,
}: {
  path: string;
  params: Record<string, any>;
  fetchOptions?: RequestInit;
  process?: (response: Response<T>) => R;
}): Promise<R> {
  const paramsString = new URLSearchParams({ ...BASE_PARAMS, ...params });
  const res = await fetch(`${path}?${paramsString}`, fetchOptions);

  if (process) {
    return process(await res.json());
  }

  return res.json();
}

export function getCurrentWeather({ location }: Params) {
  return requestData<{ now: RawCurrentWeather }, CurrentWeather | null>({
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
  return requestData<{ location: RawLocation[] }, Location | null>({
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
  return requestData<{ daily: RawDailyWeather[] }, DailyWeather[]>({
    path: `${WEATHER_URL}/7d`,
    params: { location },
    process(response) {
      if (response.code !== "200") {
        return [];
      }

      return normalizeDailyWeatherArray(response.daily);
    },
  });
}

export function getHourlyForecast({ location }: Params) {
  return requestData<{ hourly: RawHourlyWeather[] }, HourlyWeather[]>({
    path: `${WEATHER_URL}/24h`,
    params: { location },
    process(response) {
      if (response.code !== "200") {
        return [];
      }

      return normalizeHourlyWeatherArray(response.hourly);
    },
  });
}
