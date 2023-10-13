import { getLocationByName } from "@/api/qweather";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locationName = searchParams.get("location");

  if (!locationName) {
    return Response.json({ error: "location was not provided" });
  }
  const location = await getLocationByName({ location: locationName });

  return Response.json(location);
}
