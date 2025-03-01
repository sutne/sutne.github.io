import { Box, Stack, alpha, useTheme } from '@mui/material';
import { Image } from 'components/image';
import { useState } from 'react';
import { ShimmerText } from '../../../components/animated/shimmer';
import { ItemSubtitle } from './item-subtitle';
import { ItemTitle } from './item-title';
import { SampleButton } from './sample-button';

export function ItemCard(props: {
  title: string;
  subtitle: string;
  image: string;
  href?: string;
  sample?: string;
}) {
  const [isHovered, setHovered] = useState(false);
  const onClickTitle = !props.href
    ? undefined
    : () => window.open(props.href, '_blank');

  const sx = getSx();
  return (
    <Stack
      sx={sx.container}
      direction='column'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image sx={sx.image} src={props.image}>
        {props.sample ? (
          <SampleButton sample={props.sample} show={isHovered} />
        ) : (
          <></>
        )}
      </Image>
      <Box sx={sx.info}>
        <ItemTitle onClick={onClickTitle}>{props.title}</ItemTitle>
        <ItemSubtitle>{props.subtitle}</ItemSubtitle>
      </Box>
    </Stack>
  );
}

export function ItemCardShimmer() {
  const sx = getSx();
  return (
    <Stack sx={sx.container} direction='column'>
      <Image sx={sx.image} src={undefined} />
      <Box sx={sx.info}>
        <ShimmerText fontSize='1.1em' numLines={1} />
        <ShimmerText fontSize='0.8em' numLines={2} />
      </Box>
    </Stack>
  );
}

function getSx() {
  const theme = useTheme();
  return {
    container: [
      {
        position: 'relative',
        minWidth: '36mm',
        textAlign: 'left',
        borderRadius: `${4 + 10}px`,
        padding: '10px 10px 4px 10px',
        transition: 'all 0.125s ease',
        bgcolor: alpha(theme.palette.background.paper, 0.4),
        '&:hover': {
          bgcolor: 'background.paper',
        },
      },
    ],
    image: {
      borderRadius: '4px',
    },
    info: [
      {
        marginTop: '8px',
      },
    ],
  };
}
