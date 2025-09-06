import {
  alpha,
  Box,
  type Breakpoint,
  useMediaQuery,
  useTheme,
} from '@mui/material';

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];
type PartialBreakpoints = AtLeastOne<Record<Breakpoint, number>>;

export function RarityPyramid(props: {
  rarity: string;
  pixelWidth: number | PartialBreakpoints;
}) {
  const rarity = Number(props.rarity);
  const earnedRatio = Number.isNaN(rarity) ? 0 : rarity / 100;

  // equilateral triangle:
  // all sides have same length, all angles are 60 degrees
  const width = getWidth(props.pixelWidth);
  const height = (Math.sqrt(3) / 2) * width;

  // Derived from Area and Height formula to find height to make a triangle
  // with earnedPercentage Area of the full pyramid Area.
  const earnedPyramidHeight = Math.sqrt(3 * earnedRatio * width ** 2) / 2;
  const earnedHeightPercentage = 100 * (earnedPyramidHeight / height);

  const theme = useTheme();
  const sx = getSx();
  return <Box sx={sx.pyramid} />;
  function getSx() {
    return {
      pyramid: {
        margin: `${width * 0.01}px ${width * 0.1}px ${width * 0.2}px ${width * 0.1}px`,
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        clipPath: 'polygon(50% 0,100% 100%,0 100%)',
        bgcolor: alpha(theme.palette.text.primary, 0.1),
        overflow: 'hidden',
        '&:after': {
          position: 'absolute',
          content: '""',
          left: 0,
          bottom: `${100 - earnedHeightPercentage}%`,
          width: '100%',
          height: '100%',
          background: theme.palette.text.primary,
        },
      },
    };
  }
}

function getWidth(pixelWidth: number | PartialBreakpoints): number {
  if (typeof pixelWidth === 'number') return pixelWidth;
  const theme = useTheme();
  let breakpointWidth = 0;
  for (const [breakpoint, width] of Object.entries(pixelWidth)) {
    const match = useMediaQuery(theme.breakpoints.up(breakpoint as Breakpoint));
    if (match) breakpointWidth = width;
  }
  return breakpointWidth;
}
