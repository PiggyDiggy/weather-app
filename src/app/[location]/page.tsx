import { StoreProvider } from "@/store/provider";
import { LocationInput } from "@/components/LocationInput";
import { WeatherSlider } from "@/components/WeatherSlider";
import { getLocationByName, getAllWeather } from "@/api/qweather";
import { getMostRelevantLocation } from "@/entities/location";

import style from "./page.module.css";

type Params = {
  params: { location: string };
};

export default async function Page({ params: { location } }: Params) {
  const loc = await getLocationByName({ location }).catch(() => null);
  if (!loc) {
    return <div>Location not found</div>;
  }

  const mostRelevantLocation = getMostRelevantLocation(loc);
  const { currentWeather, dailyForecast, hourlyForecast } = await getAllWeather({ location: mostRelevantLocation.id });

  if (!currentWeather) {
    return <div>Weather for current location is not available</div>;
  }

  return (
    <div className={style.page}>
      <StoreProvider location={mostRelevantLocation}>
        <LocationInput />
        <WeatherSlider current={currentWeather} daily={dailyForecast} hourly={hourlyForecast} />
      </StoreProvider>
    </div>
  );
}
