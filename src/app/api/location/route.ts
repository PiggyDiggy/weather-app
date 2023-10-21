import { getLocations } from "@/api/qweather";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locationName = searchParams.get("name");

  if (!locationName) {
    return Response.json({ error: "location name was not provided" });
  }
  const location = await getLocations({ locationParam: locationName });

  if (!location) {
    return Response.json({ error: "location was not found" });
  }

  return Response.json(location);
}
