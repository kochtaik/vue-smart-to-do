export function destructureDate(dateObj) {
  return {
    year: dateObj.getFullYear(),
    month: dateObj.getMonth(),
    day: dateObj.getDate(),
  };
}
