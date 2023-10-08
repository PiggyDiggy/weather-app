import { createSlides } from "@/utils";
import { WeatherSlider } from "@/components/WeatherSlider";
import { getLocationByName, getCurrentWeather, getDailyForecast, getHourlyForecast } from "@/api";

import style from "./page.module.css";

type Params = {
  params: { location: string };
};

export default async function Page({ params: { location } }: Params) {
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
