import { Box, Typography } from '@mui/material';
import { DAY_LABELS, useSx } from '../helpers';

export function DayLabels() {
  const sx = useSx();
  return (
    <Box sx={sx.dayLabels}>
      {DAY_LABELS.map((label, i) => (
        <Box key={label} sx={sx.dayLabelCell}>
          {i % 2 === 0 ? (
            <Typography sx={sx.dayLabel}>{label}</Typography>
          ) : null}
        </Box>
      ))}
    </Box>
  );
}
