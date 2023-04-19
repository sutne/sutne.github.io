import React from 'react';
import { alpha, Box, Typography, useTheme } from '@mui/material';

export function ProgressBar({ progress }: { progress: number }) {
  const theme = useTheme();
  const sx = getSx();
  return (
    <Box sx={sx.container}>
      <Typography sx={sx.percentage}>{progress}%</Typography>
      <Box sx={sx.bar} />
    </Box>
  );

  function getSx() {
    return {
      container: {
        width: '100%',
      },
      percentage: {
        fontSize: { xs: '0.6rem', sm: '1rem' },
      },
      bar: {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        alignSelf: 'center',
        height: '0.4rem',
        borderRadius: '0.2rem',
        bgcolor: alpha(theme.palette.text.primary, 0.1),
        '&:after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: `${100 - progress}%`,
          width: '100%',
          height: '100%',
          bgcolor: theme.palette.text.primary,
          borderRadius: '0.2rem',
        },
      },
    };
  }
}
