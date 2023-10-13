import { StoreProvider } from "@/store/provider";
import { LocationInput } from "@/components/LocationInput";
import { WeatherSlider } from "@/components/WeatherSlider";
import { getLocationByName, getAllWeather } from "@/api/qweather";

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

  const { currentWeather, dailyForecast, hourlyForecast } = await getAllWeather({ location: locationId });

  if (!currentWeather) {
    return <div>Weather for current location is not available</div>;
  }

  return (
    <div className={style.page}>
      <StoreProvider location={loc}>
        <LocationInput />
        <WeatherSlider current={currentWeather} daily={dailyForecast} hourly={hourlyForecast} />
      </StoreProvider>
    </div>
  );
}
