import {
  alpha,
  Box,
  Stack,
  type Theme,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';
import { Shimmer } from '../../../../../../components/animated/shimmer';

type Day = {
  date: Date;
  count: number;
};

type Week = {
  // Monday-first. Index 0 = Monday, ..., 6 = Sunday.
  // Slots before the first day or after the last day in the range are undefined.
  days: (Day | undefined)[];
  // Date of the Monday that starts this week. Used as a stable React key.
  weekStartKey: string;
};

const MONTH_LABELS = [
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

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** Convert JS Date.getDay() (Sun=0..Sat=6) to Monday-first index (Mon=0..Sun=6). */
function mondayFirstIndex(date: Date): number {
  return (date.getDay() + 6) % 7;
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfWeekMonday(date: Date): Date {
  const d = startOfDay(date);
  d.setDate(d.getDate() - mondayFirstIndex(d));
  return d;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDate(date: Date): string {
  const day = date.getDate();
  const month = MONTH_LABELS[date.getMonth()];
  const year = date.getFullYear();
  const weekday = DAY_LABELS[mondayFirstIndex(date)];
  return `${weekday}, ${month} ${day}, ${year}`;
}

function buildWeeks(timestamps: Date[]): Week[] {
  if (timestamps.length === 0) return [];

  const today = startOfDay(new Date());

  const earliestTime = timestamps.reduce(
    (min, t) => Math.min(min, t.getTime()),
    Number.POSITIVE_INFINITY,
  );
  const firstDay = startOfDay(new Date(earliestTime));

  const startWeek = startOfWeekMonday(firstDay);
  const endWeek = startOfWeekMonday(today);

  // Count earnings per day key.
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
function getLevel(count: number): number {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 8) return 2;
  if (count <= 16) return 3;
  return 4;
}

export function ContributionGraph(props: { timestamps: (Date | undefined)[] }) {
  const validTimestamps = useMemo(
    () => props.timestamps.filter((d): d is Date => d !== undefined),
    [props.timestamps],
  );
  const weeks = useMemo(() => buildWeeks(validTimestamps), [validTimestamps]);

  const totalInRange = useMemo(
    () =>
      weeks.reduce(
        (sum, week) =>
          sum + week.days.reduce((sum, day) => sum + (day?.count ?? 0), 0),
        0,
      ),
    [weeks],
  );

  const theme = useTheme();
  const sx = getSx(theme);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on week-count change
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth;
  }, [weeks.length]);

  const monthMarkers: { weekIndex: number; label: string }[] = [];
  const yearMarkers: { weekIndex: number; label: string }[] = [];
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

  return (
    <Stack sx={sx.container} spacing={{ xs: '8px', sm: '16px' }}>
      <Stack
        sx={{ alignItems: 'center' }}
        direction='row'
        spacing={{ xs: '8px', sm: '16px' }}
      >
        <Typography
          variant='caption'
          sx={{
            flexGrow: 1,
            color: 'text.secondary',
            whiteSpace: 'no-wrap',
          }}
        >
          {totalInRange} earned trophies
        </Typography>
        <Stack direction='row' spacing='6px' sx={{ alignItems: 'center' }}>
          <Typography sx={sx.legendText}>Less</Typography>
          {[0, 1, 2, 3, 4].map((level) => (
            <Box
              key={level}
              sx={{
                ...sx.cell,
                background: getLevelColor(theme, level),
              }}
            />
          ))}
          <Typography sx={sx.legendText}>More</Typography>
        </Stack>
      </Stack>
      <Box sx={sx.scroll} ref={scrollRef}>
        <Box sx={sx.grid}>
          {yearMarkers.length > 0 ? (
            <Box sx={sx.monthRow}>
              {weeks.map((week, weekIndex) => {
                const marker = yearMarkers.find(
                  (m) => m.weekIndex === weekIndex,
                );
                return (
                  <Box key={week.weekStartKey} sx={sx.monthCell}>
                    {marker ? (
                      <Typography sx={sx.yearLabel}>{marker.label}</Typography>
                    ) : null}
                  </Box>
                );
              })}
            </Box>
          ) : null}
          <Box sx={sx.monthRow}>
            {weeks.map((week, weekIndex) => {
              const marker = monthMarkers.find(
                (m) => m.weekIndex === weekIndex,
              );
              return (
                <Box key={week.weekStartKey} sx={sx.monthCell}>
                  {marker ? (
                    <Typography sx={sx.monthLabel}>{marker.label}</Typography>
                  ) : null}
                </Box>
              );
            })}
          </Box>

          <Box sx={sx.body}>
            <Box sx={sx.weeks}>
              {weeks.map((week) => (
                <Box key={week.weekStartKey} sx={sx.week}>
                  {week.days.map((day, dayIndex) => {
                    const slotKey = `${week.weekStartKey}-slot-${DAY_LABELS[dayIndex]}`;
                    if (!day) {
                      return (
                        <Box
                          key={slotKey}
                          sx={{ ...sx.cell, visibility: 'hidden' }}
                        />
                      );
                    }
                    const level = getLevel(day.count);
                    const isToday = sameDay(day.date, new Date());
                    const tooltip =
                      day.count === 0
                        ? `No trophies on ${formatDate(day.date)}`
                        : `${day.count} ${day.count === 1 ? 'trophy' : 'trophies'} on ${formatDate(day.date)}`;
                    return (
                      <Tooltip
                        key={slotKey}
                        title={tooltip}
                        arrow
                        placement='top'
                        enterDelay={0}
                      >
                        <Box
                          sx={{
                            ...sx.cell,
                            background: getLevelColor(theme, level),
                            outline: isToday
                              ? `1px solid ${alpha(theme.palette.text.primary, 0.6)}`
                              : 'none',
                            outlineOffset: isToday ? '1px' : undefined,
                          }}
                        />
                      </Tooltip>
                    );
                  })}
                </Box>
              ))}
            </Box>
            <Box sx={sx.dayLabels}>
              {DAY_LABELS.map((label, i) => (
                <Box key={label} sx={sx.dayLabelCell}>
                  {i % 2 === 0 ? (
                    <Typography sx={sx.dayLabel}>{label}</Typography>
                  ) : null}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}

export function ContributionGraphShimmer() {
  const sx = getSx(useTheme());
  return (
    <Box sx={{ ...sx.container, padding: 0, aspectRatio: 4 }}>
      <Shimmer sx={{ width: '100%', height: '100%' }} />
    </Box>
  );
}

function getLevelColor(theme: Theme, level: number): string {
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

function getSx(theme: Theme) {
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
  };
}
