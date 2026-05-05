import { Box, Typography } from '@mui/material';
import { type Marker, useSx, type Week } from '../helpers';

export function MarkerRow(props: {
  weeks: Week[];
  markers: Marker[];
  variant: 'month' | 'year';
}) {
  const sx = useSx();
  const labelSx = props.variant === 'year' ? sx.yearLabel : sx.monthLabel;
  return (
    <Box sx={sx.monthRow}>
      {props.weeks.map((week, weekIndex) => {
        const marker = props.markers.find((m) => m.weekIndex === weekIndex);
        return (
          <Box key={week.weekStartKey} sx={sx.monthCell}>
            {marker ? (
              <Typography sx={labelSx}>{marker.label}</Typography>
            ) : null}
          </Box>
        );
      })}
    </Box>
  );
}
