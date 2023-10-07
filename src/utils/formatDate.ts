export const getFormattedTime = (date: Date) => {
  return date.toLocaleString("en-GB", {
    minute: "2-digit",
    hour: "2-digit",
    timeZone: "UTC",
  });
};
