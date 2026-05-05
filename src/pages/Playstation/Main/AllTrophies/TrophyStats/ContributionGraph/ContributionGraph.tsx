import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';
import { Shimmer } from '../../../../../../components/animated/shimmer';
import { DayLabels } from './components/DayLabels';
import { Legend } from './components/Legend';
import { MarkerRow } from './components/MarkerRow';
import { WeekGrid } from './components/WeekGrid';
import { buildMarkers, buildWeeks, useSx } from './helpers';

export function ContributionGraph(props: { timestamps: (Date | undefined)[] }) {
  const validTimestamps = useMemo(
    () => props.timestamps.filter((d): d is Date => d !== undefined),
    [props.timestamps],
  );
  const weeks = useMemo(() => buildWeeks(validTimestamps), [validTimestamps]);
  const { monthMarkers, yearMarkers } = useMemo(
    () => buildMarkers(weeks),
    [weeks],
  );

  const totalInRange = useMemo(
    () =>
      weeks.reduce(
        (sum, week) =>
          sum + week.days.reduce((sum, day) => sum + (day?.count ?? 0), 0),
        0,
      ),
    [weeks],
  );

  const sx = useSx();

  const scrollRef = useRef<HTMLDivElement | null>(null);
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on week-count change
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth;
  }, [weeks.length]);

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
          <Legend />
        </Stack>
      </Stack>
      <Box sx={sx.scroll} ref={scrollRef}>
        <Box sx={sx.grid}>
          {yearMarkers.length > 0 ? (
            <MarkerRow weeks={weeks} markers={yearMarkers} variant='year' />
          ) : null}
          <MarkerRow weeks={weeks} markers={monthMarkers} variant='month' />
          <Box sx={sx.body}>
            <WeekGrid weeks={weeks} />
            <DayLabels />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}

export function ContributionGraphShimmer() {
  const sx = useSx();
  return (
    <Box sx={{ ...sx.container, padding: 0, aspectRatio: 4 }}>
      <Shimmer sx={{ width: '100%', height: '100%' }} />
    </Box>
  );
}
