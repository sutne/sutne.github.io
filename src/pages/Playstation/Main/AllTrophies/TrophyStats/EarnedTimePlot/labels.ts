export function getDay(dayIndex: number): string {
  switch (dayIndex) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      throw new Error(`Invalid day index: ${dayIndex}`);
  }
}

export function getMonth(monthIndex: number): string {
  const month = monthIndex + 1;
  switch (month) {
    case 1:
      return 'Jan';
    case 2:
      return 'Feb';
    case 3:
      return 'Mar';
    case 4:
      return 'Apr';
    case 5:
      return 'May';
    case 6:
      return 'Jun';
    case 7:
      return 'Jul';
    case 8:
      return 'Aug';
    case 9:
      return 'Sep';
    case 10:
      return 'Oct';
    case 11:
      return 'Nov';
    case 12:
      return 'Dec';
    default:
      throw new Error(`Invalid month index: ${monthIndex}`);
  }
}

export function getWeekDateRange(
  monthIndex: number,
  weekIndex: number,
): string {
  const startDate = 1 + weekIndex * 7;
  let endDate = (1 + weekIndex) * 7;
  const month = monthIndex + 1;
  switch (month) {
    case 2: // February
      endDate = Math.min(endDate, 29);
      break;
    case 4: // April
    case 6: // June
    case 7: // September
    case 11: // November
      endDate = Math.min(endDate, 30);
      break;
    default:
      endDate = Math.min(endDate, 31);
  }
  if (startDate === endDate) return `${startDate}`; // possible for 29. February
  return `${startDate} - ${endDate}`;
}

export function zeroPad(value: number): string {
  return `0${value}`.slice(-2);
}
