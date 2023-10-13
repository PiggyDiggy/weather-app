import { restoreDateObjectsInArray } from "@/utils";

import { getAllWeather } from "./qweather";
import { method } from ".";
import { Location } from "@/entities/location";

type Params = {
  location: string;
};

function getURL(path: string) {
  const url = new URL(window.location.host);

  return `${url.host}/api/${path}`;
}

type AllWeather = Awaited<ReturnType<typeof getAllWeather>>;

export function getAllWeatherClient({ location }: Params) {
  return method<{ error: string } | AllWeather, AllWeather>({
    path: getURL("weather"),
    params: { location },
    process(response) {
      if ("error" in response) {
        throw new Error(response.error);
      }
      return {
        dailyForecast: restoreDateObjectsInArray(response.dailyForecast, ["fxDate", "sunrise", "sunset"]),
        hourlyForecast: restoreDateObjectsInArray(response.hourlyForecast, ["fxTime"]),
        currentWeather: response.currentWeather,
      };
    },
  });
}

export function getLocationClient({ location }: Params) {
  return method<Location | null>({ path: getURL("location"), params: { location } });
}
