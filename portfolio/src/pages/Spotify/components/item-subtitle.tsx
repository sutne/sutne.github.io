import React from 'react';
import { Typography } from '@mui/material';

import { ShimmerText } from 'components/animated/shimmer';

export function ItemSubtitle(props: { children?: string; sx?: any }) {
  const sx = getSx();
  if (!props.children)
    return (
      <>
        <ShimmerText fontSize='0.8em' numLines={2} />
      </>
    );
  return <Typography sx={sx}>{props.children}</Typography>;

  function getSx() {
    return [
      {
        color: 'text.secondary',
        fontSize: '0.8em',
        fontWeight: 300,
        lineHeight: '1.6em',
        height: '3.2em',
        overflow: 'hidden',
      },
    ].concat(props.sx ?? [{}]);
  }
}
