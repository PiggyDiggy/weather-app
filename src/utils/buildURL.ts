import { Location } from "@/entities/location";

export const buildURL = (location: Location) => {
  return `/${encodeURIComponent(location.name)}?id=${location.id}`;
};
