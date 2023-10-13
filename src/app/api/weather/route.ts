import { getAllWeather } from "@/api/qweather";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locationId = searchParams.get("location");

  if (!locationId) {
    return Response.json({ error: "location id was not provided" });
  }
  const weather = await getAllWeather({ location: locationId });

  return Response.json(weather);
}
