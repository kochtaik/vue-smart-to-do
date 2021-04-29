/* Takes a date string of the form "Thu Jan 01 1970"
  and transforms it to the form "YYYY/MM/DD" in accordance
  with user's timezone. Returned value is valid
  for HTML inputs of "date" type */

export function toValidHTMLDateFormat(dateString) {
  let dateObj = new Date(dateString);
  const offset = dateObj.getTimezoneOffset();

  dateObj = new Date(dateObj.getTime() - offset * 60 * 1000);
  return dateObj.toISOString().split("T")[0];
}

export function getDaysInMonth(month, year) {
  const date = new Date(year, month, 1);
  const days = [];

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}
