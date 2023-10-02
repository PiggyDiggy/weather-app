import { RawEntity } from "@/types";

export type DailyWeather = {
  fxDate: Date;
  moonPhase: string;
  tempMax: number;
  tempMin: number;
  textDay: string;
  iconDay: string;
  iconNight: string;
  cloud: number;
  sun: {
    rise: {
      hour: number;
      minute: number;
    };
    set: {
      hour: number;
      minute: number;
    };
  };
};

export type RawDailyWeather = RawEntity<Omit<DailyWeather, "sun">> & { sunset: string; sunrise: string };

const normalizeDailyWeather = ({
  fxDate,
  moonPhase,
  tempMax,
  tempMin,
  iconDay,
  iconNight,
  cloud,
  sunrise,
  sunset,
  textDay,
}: RawDailyWeather): DailyWeather => {
  const [sunriseHour, sunriseMinute] = sunrise.split(":");
  const [sunsetHour, sunsetMinute] = sunset.split(":");

  return {
    fxDate: new Date(fxDate),
    tempMax: Number(tempMax),
    tempMin: Number(tempMin),
    cloud: Number(cloud),
    moonPhase,
    iconDay,
    iconNight,
    sun: {
      rise: {
        hour: Number(sunriseHour),
        minute: Number(sunriseMinute),
      },
      set: {
        hour: Number(sunsetHour),
        minute: Number(sunsetMinute),
      },
    },
    textDay,
  };
};

export const normalizeDailyWeatherArray = (forecast: RawDailyWeather[]) =>
  forecast.map((weather) => normalizeDailyWeather(weather));
