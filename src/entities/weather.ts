export type CurrentWeather = {
  temp: string;
  feelsLike: string;
  text: string;
  cloud: string;
};

export type DailyWeather = {
  fxDate: string;
  moonPhase: string;
  tempMax: string;
  tempMin: string;
  textDay: string;
  cloud: string;
  sunrise: string;
  sunset: string;
};

export type HourlyWeather = {
  fxTime: string;
  temp: string;
  text: string;
  cloud: string;
}