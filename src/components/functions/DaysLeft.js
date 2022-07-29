export default function DaysLeft (date) {
  let today = new Date().toISOString().slice(0, 10);
  let startDate = today;
  let endDate = date;

  let diffInMs = new Date(endDate) - new Date(startDate);
  let diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  let daysLeftResult;

  if (diffInDays >= 0) {
    daysLeftResult = diffInDays
  } else {
    daysLeftResult = 0
  }

  return daysLeftResult;
}