import React from 'react';
import { alpha, Box, useTheme } from '@mui/material';

export function Shimmer() {
  const sx = getSx();
  return (
    <>
      <Box sx={sx.container} />
    </>
  );
  function getSx() {
    const theme = useTheme();
    return {
      container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: alpha(theme.palette.background.paper, 0.5),
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          background: `linear-gradient(100deg,
            ${alpha(theme.palette.text.primary, 0)} 20%,
            ${alpha(theme.palette.text.primary, 0.05)} 60%,
            ${alpha(theme.palette.text.primary, 0)} 80%
          );`,
          animation: 'shimmering 1.5s infinite',
          '@keyframes shimmering': {
            '0%': {
              opacity: 0,
              transform: 'translateX(-100%)',
            },
            '40%': {
              opacity: 1,
            },
            '100%': {
              opacity: 0,
              transform: 'translateX(200%)',
            },
          },
        },
      },
    };
  }
}

export function ShimmerText(props: { fontSize: string; numLines: number }) {
  const lines = [];

  const sx = getSx();
  for (let i = 0; i < props.numLines; i++) {
    lines.push(
      <Box
        sx={{ ...sx.container, width: i + 1 < props.numLines ? '100%' : '70%' }}
      >
        <Shimmer />
      </Box>,
    );
  }
  return <>{lines}</>;
  function getSx() {
    return {
      container: {
        height: props.fontSize,
        borderRadius: props.fontSize,
        marginTop: `calc(${props.fontSize} * 0.5)`,
        overflow: 'hidden',
      },
    };
  }
}
