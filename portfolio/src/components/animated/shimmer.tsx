import React from 'react';
import { alpha, Box, useTheme } from '@mui/material';

export function Shimmer() {
  const sx = getSx();
  return (
    <>
      <Box sx={sx.shimmering} />
    </>
  );
  function getSx() {
    const theme = useTheme();
    return {
      shimmering: {
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: alpha(theme.palette.text.primary, 0.01),
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

export function ShimmerText(props: {
  fontSize: string | any;
  numLines?: number;
  width?: string;
}) {
  const lines = [];
  const numLines = props.numLines ?? 1;

  const sx = getSx();
  for (let i = 0; i < numLines; i++) {
    const width = props.width ?? i + 1 < numLines ? '100%' : '70%';
    lines.push(
      <Box sx={{ ...sx.container, width: width }}>
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

export function ShimmerImage(props: {
  width: string | any;
  aspectRatio?: number;
  borderRadius?: string | any;
}) {
  const sx = getSx();
  return (
    <>
      <Box sx={sx.container}>
        <Shimmer />
      </Box>
    </>
  );
  function getSx() {
    return {
      container: {
        minWidth: props.width,
        aspectRatio: props.aspectRatio ?? 1,
        borderRadius: props.borderRadius ?? '8px',
        lineHeight: 0,
        fontSize: 0,
        overflow: 'hidden',
      },
    };
  }
}
