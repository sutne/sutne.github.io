import { alpha, type Theme, useTheme } from '@mui/material';

export type Day = {
  date: Date;
  count: number;
};

export type Week = {
  // Monday-first. Index 0 = Monday, ..., 6 = Sunday.
  // Slots before the first day or after the last day in the range are undefined.
  days: (Day | undefined)[];
  // Date of the Monday that starts this week. Used as a stable React key.
  weekStartKey: string;
};

export type Marker = {
  weekIndex: number;
  label: string;
};

export const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const LEVELS = [0, 1, 2, 3, 4] as const;

/** Convert JS Date.getDay() (Sun=0..Sat=6) to Monday-first index (Mon=0..Sun=6). */
export function mondayFirstIndex(date: Date): number {
  return (date.getDay() + 6) % 7;
}

export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function startOfWeekMonday(date: Date): Date {
  const d = startOfDay(date);
  d.setDate(d.getDate() - mondayFirstIndex(d));
  return d;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function formatDate(date: Date): string {
  const day = date.getDate();
  const month = MONTH_LABELS[date.getMonth()];
  const year = date.getFullYear();
  const weekday = DAY_LABELS[mondayFirstIndex(date)];
  return `${weekday}, ${month} ${day}, ${year}`;
}

export function buildWeeks(timestamps: Date[]): Week[] {
  if (timestamps.length === 0) return [];

  const today = startOfDay(new Date());

  const earliestTime = timestamps.reduce(
    (min, t) => Math.min(min, t.getTime()),
    Number.POSITIVE_INFINITY,
  );
  const firstDay = startOfDay(new Date(earliestTime));

  const startWeek = startOfWeekMonday(firstDay);
  const endWeek = startOfWeekMonday(today);

  const counts = new Map<string, number>();
  for (const ts of timestamps) {
    const d = startOfDay(ts);
    if (d.getTime() < firstDay.getTime()) continue;
    if (d.getTime() > today.getTime()) continue;
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const weeks: Week[] = [];
  let cursor = new Date(startWeek);
  while (cursor.getTime() <= endWeek.getTime()) {
    const days: (Day | undefined)[] = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(cursor, i);
      if (
        day.getTime() < firstDay.getTime() ||
        day.getTime() > today.getTime()
      ) {
        days.push(undefined);
      } else {
        const key = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;
        days.push({ date: day, count: counts.get(key) ?? 0 });
      }
    }
    weeks.push({
      days,
      weekStartKey: `${cursor.getFullYear()}-${cursor.getMonth()}-${cursor.getDate()}`,
    });
    cursor = addDays(cursor, 7);
  }
  return weeks;
}

/** Determine intensity bucket 0..4 based on absolute trophy count. */
export function getLevel(count: number): number {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 8) return 2;
  if (count <= 16) return 3;
  return 4;
}

export function getLevelColor(theme: Theme, level: number): string {
  const base = 'rgb(19, 105, 227)';
  const empty = alpha(theme.palette.text.primary, 0.08);
  switch (level) {
    case 0:
      return empty;
    case 1:
      return alpha(base, 0.35);
    case 2:
      return alpha(base, 0.55);
    case 3:
      return alpha(base, 0.75);
    case 4:
      return base;
    default:
      return empty;
  }
}

export function buildMarkers(weeks: Week[]): {
  monthMarkers: Marker[];
  yearMarkers: Marker[];
} {
  const monthMarkers: Marker[] = [];
  const yearMarkers: Marker[] = [];
  let lastMonth = -1;
  let lastYear = -1;
  weeks.forEach((week, weekIndex) => {
    const firstDay = week.days.find((d) => d !== undefined)?.date;
    if (!firstDay) return;
    const month = firstDay.getMonth();
    const year = firstDay.getFullYear();
    if (month !== lastMonth) {
      monthMarkers.push({ weekIndex, label: MONTH_LABELS[month] });
      lastMonth = month;
    }
    if (year !== lastYear) {
      yearMarkers.push({ weekIndex, label: String(year) });
      lastYear = year;
    }
  });
  return { monthMarkers, yearMarkers };
}

export function useSx() {
  const theme = useTheme();
  const cellSize = { xs: '10px', sm: '12px' };
  const cellGap = '3px';
  return {
    container: {
      background: `radial-gradient(
                      ellipse at 70% 100%, 
                      ${alpha(theme.palette.background.paper, 0.6)} 50%, 
                      ${alpha(theme.palette.background.paper, 1)} 100%
                  )`,
      padding: { xs: '8px 16px 8px 8px', sm: '16px 24px 20px 16px' },
      borderRadius: { xs: '22px', sm: '28px' },
      boxSizing: 'border-box',
      border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
      width: '100%',
    },
    scroll: {
      width: '100%',
      overflowX: 'auto',
      scrollbarGutter: 'stable',
      paddingBottom: '8px',
      '&::-webkit-scrollbar': { height: '6px' },
      '&::-webkit-scrollbar-thumb': {
        background: alpha(theme.palette.text.primary, 0.2),
        borderRadius: '3px',
      },
    },
    grid: {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: cellGap,
    },
    monthRow: {
      display: 'flex',
      gap: cellGap,
    },
    monthCell: {
      width: cellSize,
      height: '14px',
      position: 'relative',
    },
    monthLabel: {
      position: 'absolute',
      left: 0,
      top: 0,
      fontSize: { xs: '10px', sm: '12px' },
      color: alpha(theme.palette.text.primary, 0.7),
      whiteSpace: 'nowrap',
      lineHeight: 1,
    },
    yearLabel: {
      position: 'absolute',
      left: 0,
      top: 0,
      fontSize: { xs: '10px', sm: '12px' },
      fontWeight: 600,
      color: alpha(theme.palette.text.primary, 0.85),
      whiteSpace: 'nowrap',
      lineHeight: 1,
    },
    body: {
      display: 'flex',
      gap: cellGap,
    },
    dayLabels: {
      display: 'flex',
      flexDirection: 'column',
      gap: cellGap,
      width: { xs: '24px', sm: '28px' },
      marginLeft: { xs: '4px', sm: '6px' },
    },
    dayLabelCell: {
      height: cellSize,
      display: 'flex',
      alignItems: 'center',
    },
    dayLabel: {
      fontSize: { xs: '9px', sm: '11px' },
      color: alpha(theme.palette.text.primary, 0.7),
      lineHeight: 1,
    },
    weeks: {
      display: 'flex',
      gap: cellGap,
    },
    week: {
      display: 'flex',
      flexDirection: 'column',
      gap: cellGap,
    },
    cell: {
      width: cellSize,
      height: cellSize,
      borderRadius: '2px',
    },
    legendText: {
      fontSize: { xs: '10px', sm: '12px' },
      color: alpha(theme.palette.text.primary, 0.7),
    },
  } as const;
}

export type Sx = ReturnType<typeof useSx>;
