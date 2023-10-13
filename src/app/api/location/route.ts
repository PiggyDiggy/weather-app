import { getLocationsByName } from "@/api/qweather";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locationName = searchParams.get("name");

  if (!locationName) {
    return Response.json({ error: "location name was not provided" });
  }
  const location = await getLocationsByName({ locationName });

  return Response.json(location);
}
