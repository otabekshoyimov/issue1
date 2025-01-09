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

export const OK = 200 ;
export const CREATED = 201;
export const BAD_REQUEST = 400;
export const SERVER_ERROR = 500;
