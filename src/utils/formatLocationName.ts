import type { Location } from "@/entities/location";

export const formatLocationName = (location: Location, withAdm: boolean = true) => {
  if (!location.name) return "";

  const result = [location.name];

  if (withAdm && !location.name.includes(location.adm1)) {
    result.push(location.adm1);
  }

  if (!location.name.includes(location.country)) {
    result.push(location.country);
  }

  return result.join(", ");
};
