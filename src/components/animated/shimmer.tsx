import { Box, alpha, useTheme } from '@mui/material';

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

export function ShimmerText(props: {
  fontSize: string | number | object;
  numLines?: number;
  width?: string;
}) {
  const lines = [];
  const numLines = props.numLines ?? 1;

  const sx = getSx();
  for (let i = 0; i < numLines; i++) {
    const width = (props.width ?? i + 1 < numLines) ? '100%' : '70%';
    lines.push(
      <Box key={i} sx={{ ...sx.container, width: width }}>
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
          aspectRatio: 1,
          borderRadius: '8px',
          lineHeight: 0,
          fontSize: 0,
          overflow: 'hidden',
        },
      ].concat(props.sx ?? []),
    };
  }
}
