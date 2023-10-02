import { RawEntity } from "@/types";

export type CurrentWeather = {
  temp: number;
  feelsLike: number;
  text: string;
  icon: string;
  cloud: number;
};

export type RawCurrentWeather = RawEntity<CurrentWeather>;

export const normalizeCurrentWeather = ({ cloud, temp, icon, feelsLike, text }: RawCurrentWeather): CurrentWeather => ({
  cloud: Number(cloud),
  temp: Number(temp),
  feelsLike: Number(feelsLike),
  text,
  icon,
});
