import React from 'react';
import { alpha, Box, Stack, useTheme } from '@mui/material';

import { Image } from 'components/image';

import { ItemSubtitle } from './item-subtitle';
import { ItemTitle } from './item-title';
import { SampleButton } from './sample-button';

export function ItemCard(props: {
  title?: string;
  subtitle?: string;
  image?: string;
  sample?: string;
}) {
  const [isHovered, setHovered] = React.useState(false);

  const theme = useTheme();

  const sx = getSx();
  return (
    <Stack
      sx={sx.container}
      direction='column'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image src={props.image}>
        {props.sample ? (
          <SampleButton sample={props.sample} show={isHovered} />
        ) : (
          <></>
        )}
      </Image>
      <Box sx={sx.info}>
        <ItemTitle>{props.title}</ItemTitle>
        <ItemSubtitle>{props.subtitle}</ItemSubtitle>
      </Box>
    </Stack>
  );

  function getSx() {
    return {
      container: [
        {
          position: 'relative',
          minWidth: '36mm',
          textAlign: 'left',
          borderRadius: '8px',
          padding: '12px 12px 8px 12px',
          transition: 'all 0.125s ease',
          bgcolor: alpha(theme.palette.background.paper, 0.3),
          '&:hover': {
            bgcolor: 'background.paper',
          },
        },
      ],
      info: [
        {
          marginTop: '8px',
        },
      ],
    };
  }
}
