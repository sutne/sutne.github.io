import { Box, Typography, useTheme } from '@mui/material';
import { getLevelColor, LEVELS, useSx } from '../helpers';

export function Legend() {
  const sx = useSx();
  const theme = useTheme();
  return (
    <>
      <Typography sx={sx.legendText}>Less</Typography>
      {LEVELS.map((level) => (
        <Box
          key={level}
          sx={{
            ...sx.cell,
            background: getLevelColor(theme, level),
          }}
        />
      ))}
      <Typography sx={sx.legendText}>More</Typography>
    </>
  );
}
