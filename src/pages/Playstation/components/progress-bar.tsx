import { Box, Typography, alpha, useTheme } from '@mui/material';
import { Shimmer } from '../../../components/animated/shimmer';

export function ProgressBar({ progress }: { progress: number }) {
  const sx = getSx(progress);
  return (
    <Box sx={sx.container}>
      <Typography sx={sx.percentage}>{progress}%</Typography>
      <Box sx={sx.bar} />
    </Box>
  );
}

export function ProgressBarShimmer() {
  const sx = getSx(0);
  return (
    <Box sx={sx.container}>
      <Typography sx={sx.percentage} />
      <Box sx={{ ...sx.bar, bgcolor: 'transparent' }}>
        <Shimmer />
      </Box>
    </Box>
  );
}

function getSx(progress: number) {
  const theme = useTheme();
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
      height: { xs: '0.2rem', sm: '0.4rem' },
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
