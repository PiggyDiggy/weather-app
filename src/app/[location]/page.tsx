import { WeatherSlider } from "@/components/WeatherSlider";
import { getAllWeather, getLocations } from "@/api/qweather";
import { getMostRelevantLocation } from "@/entities/location";
import { createSlides } from "@/utils";

type Params = {
  params: { location: string };
};

export default async function Page({ params }: Params) {
  const locations = await getLocations({ locationParam: params.location }).catch(() => null);
  if (!locations) {
    return <div>Location not found</div>;
  }

  const mostRelevant = getMostRelevantLocation(locations);
  const { currentWeather, dailyForecast, hourlyForecast } = await getAllWeather({ locationId: mostRelevant.id });

  if (!currentWeather) {
    return <div>Weather for current location is not available</div>;
  }

  const slides = createSlides(currentWeather, hourlyForecast, dailyForecast, mostRelevant.utcOffset);

  return <WeatherSlider slides={slides} />;
}
