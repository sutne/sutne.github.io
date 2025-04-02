import { Box, Stack, Typography, alpha, useTheme } from '@mui/material';
import { useMemo, useState } from 'react';
import { Shimmer } from '../../../../../../../components/animated/shimmer';
import { GroupButton } from '../../../../Game/components/group-button';
import { BarChart, type Section } from './BarChart/BarChart';
import {
  toAllTimeSections,
  toDailySections,
  toWeeklySections,
  toYearlySections,
} from './sections';

export const timeSectionTypes = [
  'Daily',
  'Weekly',
  'Yearly',
  'All Time',
] as const;
export type TimeSectionType = (typeof timeSectionTypes)[number];

export function EarnedTimePlot(props: { timestamps: (Date | undefined)[] }) {
  const [sectionBy, setSectionBy] = useState<TimeSectionType>('Daily');

  const missingTimestampCount = props.timestamps.filter((d) => !d).length;
  const validTimestamps = props.timestamps.filter((d) => d !== undefined);

  const sections: Section[] = useMemo(() => {
    if (sectionBy === 'Daily') return toDailySections(validTimestamps);
    if (sectionBy === 'Weekly') return toWeeklySections(validTimestamps);
    if (sectionBy === 'Yearly') return toYearlySections(validTimestamps);
    if (sectionBy === 'All Time') return toAllTimeSections(validTimestamps);
    throw new Error(`Missing sections for ${sectionBy}`);
  }, [sectionBy, validTimestamps]);

  const sx = getSx();
  return (
    <Stack sx={sx.container} spacing={{ xs: '8px', sm: '16px' }}>
      <Stack
        alignItems='center'
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: '8px', sm: '16px' }}
      >
        <Stack direction='row' spacing={1}>
          {timeSectionTypes.map((type) => (
            <GroupButton
              key={type}
              type={type}
              isSelected={type === sectionBy}
              onClick={() => setSectionBy(type)}
            />
          ))}
        </Stack>
        <Typography
          flexGrow={1}
          color='text.secondary'
          variant='caption'
          textAlign='right'
          whiteSpace='no-wrap'
        >
          {missingTimestampCount} earned trophies are missing timestamps
        </Typography>
      </Stack>
      <BarChart sections={sections} />
    </Stack>
  );
}

export function EarnedTimePlotShimmer() {
  const sx = getSx();
  return (
    <Box sx={{ ...sx.container, padding: 0, aspectRatio: 1.5 }}>
      <Shimmer sx={{ width: '100%', height: '100%' }} />
    </Box>
  );
}

function getSx() {
  const theme = useTheme();
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
  };
}
