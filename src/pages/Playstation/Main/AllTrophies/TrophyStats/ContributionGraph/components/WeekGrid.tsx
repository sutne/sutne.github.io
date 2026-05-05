import { alpha, Box, Tooltip, useTheme } from '@mui/material';
import {
  DAY_LABELS,
  type Day,
  formatDate,
  getLevel,
  getLevelColor,
  sameDay,
  useSx,
  type Week,
} from '../helpers';

export function WeekGrid(props: { weeks: Week[] }) {
  const sx = useSx();
  return (
    <Box sx={sx.weeks}>
      {props.weeks.map((week) => (
        <Box key={week.weekStartKey} sx={sx.week}>
          {week.days.map((day, dayIndex) => (
            <DayCell
              key={`${week.weekStartKey}-slot-${DAY_LABELS[dayIndex]}`}
              day={day}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}

function DayCell(props: { day: Day | undefined }) {
  const sx = useSx();
  const theme = useTheme();
  const { day } = props;
  if (!day) {
    return <Box sx={{ ...sx.cell, visibility: 'hidden' }} />;
  }
  const level = getLevel(day.count);
  const isToday = sameDay(day.date, new Date());
  const tooltip =
    day.count === 0
      ? `No trophies on ${formatDate(day.date)}`
      : `${day.count} ${day.count === 1 ? 'trophy' : 'trophies'} on ${formatDate(day.date)}`;
  return (
    <Tooltip title={tooltip} arrow placement='top' enterDelay={0}>
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
}
