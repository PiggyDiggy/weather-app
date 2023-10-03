import { RawEntity } from "@/types";

export type DailyWeather = {
  fxDate: Date;
  moonPhase: string;
  moonPhaseIcon: string;
  tempMax: number;
  tempMin: number;
  textDay: string;
  iconDay: string;
  iconNight: string;
  cloud: number;
  sunrise: Date | null;
  sunset: Date | null;
};

export type RawDailyWeather = RawEntity<DailyWeather>;

const normalizeDailyWeather = ({
  fxDate,
  moonPhase,
  moonPhaseIcon,
  tempMax,
  tempMin,
  iconDay,
  iconNight,
  cloud,
  sunrise,
  sunset,
  textDay,
}: RawDailyWeather): DailyWeather => ({
  fxDate: new Date(fxDate),
  tempMax: Number(tempMax),
  tempMin: Number(tempMin),
  cloud: Number(cloud),
  moonPhase,
  moonPhaseIcon,
  iconDay,
  iconNight,
  sunrise: sunrise ? new Date(`${fxDate}T${sunrise}+00:00`) : null,
  sunset: sunset ? new Date(`${fxDate}T${sunset}+00:00`) : null,
  textDay,
});

export const normalizeDailyWeatherArray = (forecast: RawDailyWeather[]) =>
  forecast.map((weather) => normalizeDailyWeather(weather));
