import type { RawEntity } from "@/types";

export type Location = {
  name: string;
  id: string;
  tz: string;
  utcOffset: number;
  country: string;
  rank: number;
};

export type RawLocation = RawEntity<Location>;

export const normalizeLocation = ({ name, id, tz, utcOffset, country, rank }: RawLocation): Location => ({
  name,
  id,
  tz,
  country,
  rank: Number(rank),
  utcOffset: getUTCOffsetMinutes(utcOffset),
});

export const normalizeLocationsArray = (locations: RawLocation[]) =>
  locations.map((location) => normalizeLocation(location));

const getUTCOffsetMinutes = (offset: string) => {
  const match = offset.match(/([+-])(\d{2}):(\d{2})/);
  if (!match) return 0;

  const sign = match[1];
  const minutes = Number(match[2]) * 60 + Number(match[3]);

  return sign === "-" ? minutes * -1 : minutes;
};

export const getMostRelevantLocation = (locations: Location[]) => {
  let highestRank = locations[0].rank;
  let highestRankIndex = 0;

  for (let i = 1; i < locations.length; i++) {
    if (locations[i].rank < highestRank) {
      highestRank = locations[i].rank;
      highestRankIndex = i;
    }
  }

  return locations[highestRankIndex];
};

export const sortLocationsByRank = (locations: Location[]) => {
  return [...locations].sort((a, b) => a.rank - b.rank);
};
