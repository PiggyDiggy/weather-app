import type { RawEntity } from "@/types";

export type Location = {
  name: string;
  id: string;
  tz: string;
};

export type RawLocation = RawEntity<Location>;

export const normalizeLocation = ({ name, id, tz }: RawLocation) => ({
  name,
  id,
  tz,
});
