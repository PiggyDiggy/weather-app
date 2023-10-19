import { Location } from "@/entities/location";

import { method } from ".";

function getURL(path: string) {
  const url = new URL(window.location.host);

  return `${url.host}/api/${path}`;
}

export function searchLocationsByName({
  locationName,
  fetchOptions,
}: {
  locationName: string;
  fetchOptions?: RequestInit;
}) {
  return method<{ error: string } | Location[], Location[]>({
    path: getURL("location"),
    params: { name: locationName },
    fetchOptions,
    process(response) {
      if ("error" in response) {
        throw new Error(response.error);
      }

      return response;
    },
  });
}
