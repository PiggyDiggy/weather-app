export const formatTemperature = (temp: number) => {
  return `${temp > 0 ? "+" : ""}${temp}°`;
};
