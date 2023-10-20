import { LocationPage } from "@/components/LocationPage";
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
    return <LocationPage />;
  }

  const mostRelevant = getMostRelevantLocation(locations);
  const { currentWeather, dailyForecast, hourlyForecast } = await getAllWeather({ locationId: mostRelevant.id });

  if (!currentWeather) {
    return <LocationPage slides={[]} location={mostRelevant} />;
  }

  const slides = createSlides(currentWeather, hourlyForecast, dailyForecast, mostRelevant.utcOffset);

  return <LocationPage slides={slides} location={mostRelevant} />;
}
