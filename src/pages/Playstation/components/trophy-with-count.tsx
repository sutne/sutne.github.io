import { Box, Typography } from '@mui/material';
import { ShimmerText } from '../../../components/animated/shimmer';
import type { TrophyType } from '../service/types';

export function TrophyWithCount(props: {
  type: TrophyType;
  count: number;
  hideZero?: boolean;
  hide?: boolean;
  fontSize?: string | number | object;
  maxWidth?: string;
}) {
  const image = new URL(`../assets/trophies/${props.type}.png`, import.meta.url)
    .href;
  const sx = getSx(props);
  return (
    <Box sx={sx.container}>
      <Box sx={sx.image} component='img' src={image} />
      <Typography sx={sx.text}>{props.count}</Typography>
    </Box>
  );
}

export function TrophyWithCountShimmer(props: {
  type: TrophyType;
  fontSize?: string | number | object;
  maxWidth?: string;
}) {
  const image = new URL(`../assets/trophies/${props.type}.png`, import.meta.url)
    .href;
  const sx = getSx({ ...props, count: 0, hideZero: true });
  return (
    <Box sx={sx.container}>
      <Box sx={sx.image} component='img' src={image} />
      <Box sx={{ position: sx.text.position, top: sx.text.top }}>
        <ShimmerText fontSize={sx.text.fontSize} />
      </Box>
    </Box>
  );
}

function getSx(props: {
  type: TrophyType;
  count: number;
  hideZero?: boolean;
  hide?: boolean;
  fontSize?: string | number | object;
  maxWidth?: string;
}) {
  const hide = props.hideZero && props.count === 0;
  const hideText =
    props.hideZero && (props.type === 'platinum' || props.count === 0);
  const shadow = {
    xs: 'drop-shadow(0 1px 2px rgba(0,0,0,50%))',
    sm: 'drop-shadow(0 3px 5px rgba(0,0,0,50%))',
  };
  return {
    container: {
      opacity: props.hide ? 0 : hide ? 0.2 : 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: [
      {
        width: '100%',
        maxWidth: props.maxWidth ?? '80px',
      },
      !hide && {
        WebkitFilter: shadow,
        filter: shadow,
      },
    ],
    text: {
      opacity: hideText ? 0 : 1,
      position: 'relative',
      top: { xs: '0', sm: '-10px' },
      textAlign: 'center',
      fontWeight: 300,
      fontSize: props.fontSize ?? { xs: '10px', sm: '18px', md: '24px' },
    },
  };
}
