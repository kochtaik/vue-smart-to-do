export function destructureDate(dateArg) {
  let date = dateArg;
  if (!(dateArg instanceof Date)) date = new Date(dateArg);
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
  };
}
