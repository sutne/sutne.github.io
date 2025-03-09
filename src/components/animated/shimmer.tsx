import { Box, Typography, alpha, useTheme } from '@mui/material';

export function Shimmer(props: { sx?: any }) {
  const sx = getSx();
  return (
    <>
      <Box sx={sx.shimmering} />
    </>
  );
  function getSx() {
    const theme = useTheme();
    return {
      shimmering: [
        {
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: alpha(theme.palette.text.primary, 0.0125),
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
            animation: 'shimmering 1.2s infinite',
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
      ].concat(props.sx ?? []),
    };
  }
}

export function ShimmerText(
  props: {
    fontSize: string | number | object;
  } & (
    | {
        numLines?: number;
        width?: never;
      }
    | {
        numLines?: never;
        width?: string;
      }
  ),
) {
  const lines = [];
  const numLines = props.numLines ?? 1;

  const sx = getSx();
  for (let i = 0; i < numLines; i++) {
    const width = props.width ?? (i + 1 < numLines ? '100%' : '70%');
    lines.push(
      <Box key={i} sx={{ ...sx.lineContainer, width: width }}>
        <Shimmer sx={sx.shimmer} />
        {/* empty text to get correct relative line height */}
        <Typography sx={sx.text}> </Typography>
      </Box>,
    );
  }
  return <>{lines}</>;
  function getSx() {
    return {
      lineContainer: {
        position: 'relative',
        overflow: 'hidden',
        fontSize: props.fontSize,
      },
      shimmer: {
        position: 'absolute',
        bottom: 'calc(1em * 0.13)',
        left: 0,
        borderRadius: '1em',
        height: '1em',
        width: '100%',
      },
      text: {
        whiteSpace: 'pre',
        fontSize: props.fontSize,
      },
    };
  }
}

export function ShimmerImage(props: {
  width: string | number | object;
  sx?: any;
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
      container: [
        {
          minWidth: props.width,
          maxWidth: props.width,
          aspectRatio: 1,
          alignSelf: 'center',
          borderRadius: '8px',
          lineHeight: 0,
          fontSize: 0,
          overflow: 'hidden',
        },
      ].concat(props.sx ?? []),
    };
  }
}
