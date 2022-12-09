//format date function
export function getFormattedDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;
}

//function to get to include expenses in last seven days
export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}