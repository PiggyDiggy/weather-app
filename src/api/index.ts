import type { Location, CurrentWeather, DailyWeather } from "@/entities";

const WEATHER_URL = "https://devapi.qweather.com/v7/weather";
const BASE_PARAMS = { key: process.env.API_KEY as string, lang: "en" };

type Params = {
  location: string;
};

type Response<T> = ({ code: "200" } & T) | { code: "400" | "401" | "402" | "403" | "404" | "429" | "500" };

async function requestData<T>({
  path,
  params,
  fetchOptions,
}: {
  path: string;
  params: Record<string, any>;
  fetchOptions?: RequestInit;
}): Promise<Response<T>> {
  try {
    const paramsString = new URLSearchParams({ ...BASE_PARAMS, ...params });
    const res = await fetch(`${path}?${paramsString}`, fetchOptions);
    return res.json();
  } catch {
    return { code: "404" };
  }
}

export function getCurrentWeather({ location }: Params) {
  return requestData<{ now: CurrentWeather }>({
    path: `${WEATHER_URL}/now`,
    params: { location },
    fetchOptions: { next: { revalidate: 10 * 60 } },
  });
}

export function getLocationByName({ location }: Params) {
  return requestData<{ location: Location[] }>({
    path: "https://geoapi.qweather.com/v2/city/lookup",
    params: { location },
  });
}

export function getDailyWeather({ location }: Params) {
  return requestData<{ daily: DailyWeather[] }>({
    path: `${WEATHER_URL}/7d`,
    params: { location },
  });
}
