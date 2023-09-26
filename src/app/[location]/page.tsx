import { createSlides } from "@/utils";
import { WeatherSlider } from "@/components/WeatherSlider";
import { getLocationByName, getCurrentWeather, getDailyForecast, getHourlyForecast } from "@/api";

type Params = {
  params: { location: string };
};

export default async function Page({ params: { location } }: Params) {
  const locResponse = await getLocationByName({ location });
  if (locResponse.code !== "200") {
    return <div>Location not found</div>;
  }
  const locationId = locResponse.location[0].id;

  const [currentWeather, dailyForecast, hourlyForecast] = await Promise.all([
    getCurrentWeather({ location: locationId }),
    getDailyForecast({ location: locationId }),
    getHourlyForecast({ location: locationId }),
  ]);

  if (currentWeather.code !== "200") {
    return <div>Weather for current location is not available</div>;
  }

  const slides = createSlides(
    currentWeather.now,
    hourlyForecast.code === "200" ? hourlyForecast.hourly : [],
    dailyForecast.code === "200" ? dailyForecast.daily : []
  );

  return (
    <div>
      <WeatherSlider slides={slides} />
    </div>
  );
}
