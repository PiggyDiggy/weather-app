import { getAllWeather } from "@/api/qweather";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locationId = searchParams.get("id");

  if (!locationId) {
    return Response.json({ error: "location id was not provided" });
  }
  const weather = await getAllWeather({ locationId });

  return Response.json(weather);
}
