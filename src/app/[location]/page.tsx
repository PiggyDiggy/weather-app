import { WeatherSlider } from "@/components/WeatherSlider";
import { getAllWeather, getLocations } from "@/api/qweather";
import { getMostRelevantLocation } from "@/entities/location";
import { createSlides } from "@/utils";

type Props = {
  params: { location: string };
  searchParams: Record<string, string | string[] | undefined>;
};

function getLocationParam({ params, searchParams }: Props) {
  if (searchParams.id) {
    return Array.isArray(searchParams.id) ? searchParams.id[0] : searchParams.id;
  }
  return decodeURIComponent(params.location);
}

export default async function Page(props: Props) {
  const locationParam = getLocationParam(props);
  const locations = await getLocations({ locationParam }).catch(() => null);
  if (!locations) {
    return <div>Location not found</div>;
  }

  const mostRelevant = getMostRelevantLocation(locations);
  const { currentWeather, dailyForecast, hourlyForecast } = await getAllWeather({ locationId: mostRelevant.id });

  if (!currentWeather) {
    return <div>Weather for current location is not available</div>;
  }

  const slides = createSlides(currentWeather, hourlyForecast, dailyForecast, mostRelevant.utcOffset);

  return <WeatherSlider slides={slides} location={mostRelevant} />;
}
