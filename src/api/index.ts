import type { Location, CurrentWeather, DailyWeather, HourlyWeather } from "@/entities";

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
  return requestData<{ now: CurrentWeather }, CurrentWeather | null>({
    path: `${WEATHER_URL}/now`,
    params: { location },
    fetchOptions: { next: { revalidate: 10 * 60 } },
    process(response) {
      if (response.code !== "200") {
        return null;
      }

      const weather = response.now;
      weather.temp = Number(weather.temp);
      weather.feelsLike = Number(weather.feelsLike);
      weather.cloud = Number(weather.cloud);
      return weather;
    },
  });
}

export function getLocationByName({ location }: Params) {
  return requestData<{ location: Location[] }, Location | null>({
    path: "https://geoapi.qweather.com/v2/city/lookup",
    params: { location },
    process(response) {
      if (response.code !== "200") {
        return null;
      }
      return response.location[0];
    },
  });
}

export function getDailyForecast({ location }: Params) {
  return requestData<{ daily: DailyWeather[] }, DailyWeather[]>({
    path: `${WEATHER_URL}/7d`,
    params: { location },
    process(response) {
      if (response.code !== "200") {
        return [];
      }

      const { daily } = response;
      daily.forEach((weather) => {
        weather.fxDate = new Date(weather.fxDate);
        weather.cloud = Number(weather.cloud);
        weather.tempMax = Number(weather.tempMax);
        weather.tempMin = Number(weather.tempMin);
      });
      return daily;
    },
  });
}

export function getHourlyForecast({ location }: Params) {
  return requestData<{ hourly: HourlyWeather[] }, HourlyWeather[]>({
    path: `${WEATHER_URL}/24h`,
    params: { location },
    process(response) {
      if (response.code !== "200") {
        return [];
      }

      const { hourly } = response;
      hourly.forEach((weather) => {
        weather.fxTime = new Date(weather.fxTime);
        weather.cloud = Number(weather.cloud);
        weather.temp = Number(weather.temp);
      });
      return hourly;
    },
  });
}
