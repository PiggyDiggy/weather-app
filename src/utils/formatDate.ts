export const getFormattedTime = (date: Date, timeZone = "UTC") => {
  return date.toLocaleString("en-GB", {
    minute: "2-digit",
    hour: "2-digit",
    timeZone,
  });
};
