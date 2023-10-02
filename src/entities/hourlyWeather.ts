import type { RawEntity } from "@/types";

export type HourlyWeather = {
  fxTime: Date;
  temp: number;
  icon: string;
  cloud: number;
};

export type RawHourlyWeather = RawEntity<HourlyWeather>;

const normalizeHourlyWeather = ({ cloud, fxTime, temp, icon }: RawHourlyWeather): HourlyWeather => ({
  fxTime: new Date(fxTime),
  cloud: Number(cloud),
  temp: Number(temp),
  icon,
});

export const normalizeHourlyWeatherArray = (forecast: RawHourlyWeather[]) =>
  forecast.map((weather) => normalizeHourlyWeather(weather));
