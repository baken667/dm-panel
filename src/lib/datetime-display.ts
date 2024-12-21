export default function datetimeDisplay(date?: Date) {
  if (!date) {
    return "";
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return new Date(date).toLocaleDateString("ru", options);
}
