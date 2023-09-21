import Link from "next/link";
import { getLocationByName, getCurrentWeather } from "@/api";

type Params = {
  params: { location: string };
};

export default async function Page({ params: { location } }: Params) {
  const locResponse = await getLocationByName({ location });
  if (locResponse.code !== "200") {
    return <div>Location not found</div>;
  }
  const locationId = locResponse.location[0].id;

  const weather = await getCurrentWeather({ location: locationId });
  if (weather.code !== "200") {
    return <div>Weather for current location is not available</div>;
  }

  return (
    <div>
      <div>Current temp - {weather.now.temp}</div>
      <Link href={`/${location}/daily`}>Daily forecast</Link>
    </div>
  );
}
