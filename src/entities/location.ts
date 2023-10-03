import type { RawEntity } from "@/types";

export type Location = {
  name: string;
  id: string;
  tz: string;
  utcOffset: number;
};

export type RawLocation = RawEntity<Location>;

export const normalizeLocation = ({ name, id, tz, utcOffset }: RawLocation): Location => ({
  name,
  id,
  tz,
  utcOffset: getUTCOffsetMinutes(utcOffset),
});

const getUTCOffsetMinutes = (offset: string) => {
  const match = offset.match(/([+-])(\d{2}):(\d{2})/);
  if (!match) return 0;

  const sign = match[1];
  const minutes = Number(match[2]) * 60 + Number(match[3]);

  return sign === "-" ? minutes * -1 : minutes;
};
