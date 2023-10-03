import { createSlides } from "@/utils";
import { WeatherSlider } from "@/components/WeatherSlider";
import { getLocationByName, getCurrentWeather, getDailyForecast, getHourlyForecast } from "@/api";

import style from "./page.module.css";

type Params = {
  params: { location: string };
};

export default async function Page({ params: { location } }: Params) {
  if (process.env.MOCK) {
    return Mock();
  }
  const loc = await getLocationByName({ location }).catch(() => null);
  if (!loc) {
    return <div>Location not found</div>;
  }

  const locationId = loc.id;

  const [currentWeather, dailyForecast, hourlyForecast] = await Promise.all([
    getCurrentWeather({ location: locationId }).catch(() => null),
    getDailyForecast({ location: locationId }).catch(() => []),
    getHourlyForecast({ location: locationId }).catch(() => []),
  ]);

  if (!currentWeather) {
    return <div>Weather for current location is not available</div>;
  }

  const slides = createSlides(currentWeather, hourlyForecast, dailyForecast, loc.utcOffset);

  return (
    <div className={style.page}>
      <WeatherSlider slides={slides} />
    </div>
  );
}

function Mock() {
  const current = { fxTime: new Date("2023-09-30"), temp: 20, feelsLike: 20, icon: "100", text: "Sunny", cloud: 10 };
  const daily = [
    {
      fxDate: new Date("2023-09-29"),
      moonPhase: "Waxing crescent",
      moonPhaseIcon: "801",
      iconDay: "100",
      iconNight: "150",
      tempMax: 20,
      tempMin: 15,
      textDay: "Cloudy",
      cloud: 50,
      sunrise: new Date("2023-09-29T06:30"),
      sunset: new Date("2023-09-29T21:20"),
    },
    {
      fxDate: new Date("2023-09-30"),
      moonPhase: "Waxing crescent",
      moonPhaseIcon: "801",
      iconDay: "100",
      iconNight: "150",
      tempMax: 20,
      tempMin: 15,
      textDay: "Cloudy",
      cloud: 50,
      sunrise: new Date("2023-09-29T06:30"),
      sunset: new Date("2023-09-29T21:20"),
    },
    {
      fxDate: new Date("2023-10-31"),
      moonPhase: "Waxing crescent",
      moonPhaseIcon: "801",
      iconDay: "100",
      iconNight: "150",
      tempMax: 20,
      tempMin: 15,
      textDay: "Cloudy",
      cloud: 50,
      sunrise: new Date("2023-09-29T06:30"),
      sunset: new Date("2023-09-29T21:20"),
    },
  ];
  const hourly = [{ fxTime: new Date("2023-09-29T10:30"), temp: 20, text: "Sunny", cloud: 10, icon: "100" }];

  const slides = createSlides(current, hourly, daily, 180);
  return (
    <div className={style.page}>
      <WeatherSlider slides={slides} />
    </div>
  );
}
