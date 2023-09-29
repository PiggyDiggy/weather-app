export type CurrentWeather = {
  fxTime: Date;
  temp: number;
  feelsLike: number;
  text: string;
  cloud: number;
};

export type DailyWeather = {
  fxDate: Date;
  moonPhase: string;
  tempMax: number;
  tempMin: number;
  textDay: string;
  cloud: number;
  sunrise: string;
  sunset: string;
};

export type HourlyWeather = {
  fxTime: Date;
  temp: number;
  text: string;
  cloud: number;
};
