import Link from "next/link";
import { getLocationByName, getDailyWeather } from "@/api";

type Params = {
  params: { location: string };
};

export default async function Page({ params: { location } }: Params) {
  const locResponse = await getLocationByName({ location });
  if (locResponse.code !== "200") {
    return <div>Location not found</div>;
  }
  const locationId = locResponse.location[0].id;

  const response = await getDailyWeather({ location: locationId });
  if (response.code !== "200") {
    return <div>Daily forecast is not available</div>;
  }

  return (
    <div>
      <ul>
        {response.daily.map((day) => (
          <li key={day.fxDate}>
            {day.fxDate} — From {day.tempMin} to {day.tempMax}
          </li>
        ))}
      </ul>
      <Link href={`/${location}`}>Back to current weather</Link>
    </div>
  );
}
