import type { Section } from './BarChart/BarChart';
import { getDay, getMonth, getWeekDateRange, zeroPad } from './labels';

export function toDailySections(timestamps: Date[]): Section[] {
  const hours: Section[] = Array(24)
    .fill(null)
    .map((_, hourIndex) => {
      const hour = zeroPad(hourIndex);
      return {
        label: hour,
        bars: Array(4)
          .fill(null)
          .map((_, quarterIndex) => {
            const startMinute = zeroPad(quarterIndex * 15);
            const endMinute = zeroPad(((quarterIndex + 1) * 15) % 60);
            const endHour = zeroPad(hourIndex + (quarterIndex === 3 ? 1 : 0));
            return {
              label: `${hour}:${startMinute} - ${endHour}:${endMinute}`,
              count: 0,
            };
          }),
      };
    });
  for (const timestamp of timestamps) {
    const hour = timestamp.getHours();
    const quarter = Math.floor(timestamp.getMinutes() / 15);
    hours[hour].bars[quarter].count++;
  }
  return hours;
}

export function toWeeklySections(timestamps: Date[]): Section[] {
  const days: Section[] = Array(7)
    .fill(null)
    .map((_, dayIndex) => {
      const day = getDay(dayIndex);
      return {
        label: day,
        bars: Array(24)
          .fill(null)
          .map((_, hourIndex) => {
            const hour = zeroPad(hourIndex);
            return {
              label: `${day} ${hour}:00 - ${hour}:59`,
              count: 0,
            };
          }),
      };
    });
  for (const timestamp of timestamps) {
    const day = timestamp.getDay();
    const hour = timestamp.getHours();
    days[day].bars[hour].count++;
  }
  const ordered = [...days.slice(1), days[0]]; // Move sunday last, as it has index 0
  return ordered;
}

export function toYearlySections(timestamps: Date[]): Section[] {
  const months: Section[] = Array(12)
    .fill(null)
    .map((_, monthIndex) => {
      const month = getMonth(monthIndex);
      return {
        label: month,
        bars: Array(5)
          .fill(null)
          .map((_, weekIndex) => {
            const dates = getWeekDateRange(monthIndex, weekIndex);
            return {
              label: `${dates} ${month}`,
              count: 0,
            };
          }),
      };
    });
  for (const timestamp of timestamps) {
    const month = timestamp.getMonth();
    const date = timestamp.getDate() - 1;
    const week = Math.floor(date / 7);
    months[month].bars[week].count++;
  }
  return months;
}

export function toAllTimeSections(timestamps: Date[]): Section[] {
  const currentYear = new Date().getFullYear();
  const firstYear = timestamps.reduce(
    (earliest, timestamp) => Math.min(earliest, timestamp.getFullYear()),
    currentYear,
  );
  const yearCount = currentYear + 1 - firstYear;
  const years: Section[] = Array(yearCount)
    .fill(null)
    .map((_, yearIndex) => {
      const year = `${firstYear + yearIndex}`;
      return {
        label: year,
        bars: Array(4)
          .fill(null)
          .map((_, quarterIndex) => {
            const startMonth = getMonth(quarterIndex * 3);
            const endMonth = getMonth((quarterIndex + 1) * 3 - 1);
            return {
              label: `${startMonth} - ${endMonth} ${year}`,
              count: 0,
            };
          }),
      };
    });
  for (const timestamp of timestamps) {
    const year = timestamp.getFullYear();
    const month = Math.floor(timestamp.getMonth() / (12 / 4));
    const index = year - firstYear;
    years[index].bars[month].count++;
  }
  return years;
}
