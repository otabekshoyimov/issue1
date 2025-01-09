export const date_formatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
});

export const format_date = (dateString: string) => {
  const date = new Date(dateString.replace(" ", "T"));

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }
  return date_formatter.format(date);
};
