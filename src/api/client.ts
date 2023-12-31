import { Location, sortLocationsByCountry } from "@/entities/location";

import { method } from ".";

function getURL(path: string) {
  return `${window.location.origin}/api/${path}`;
}

export function searchLocationsByName({
  locationName,
  fetchOptions,
  country,
}: {
  locationName: string;
  fetchOptions?: RequestInit;
  country?: string;
}) {
  return method<{ error: string } | Location[], Location[]>({
    path: getURL("location"),
    params: { name: locationName },
    fetchOptions,
    process(response) {
      if ("error" in response) {
        throw new Error(response.error);
      }

      return country ? sortLocationsByCountry(response, country) : response;
    },
  });
}
