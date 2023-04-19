import React from 'react';
import { Box } from '@mui/material';

export function Image(props: {
  src: string;
  size?: any;
  sx?: any;
  children?: JSX.Element;
}) {
  const sx = getSx();
  return (
    <Box sx={sx.container}>
      <Box sx={sx.image} component='img' src={props.src} />
      {props.children}
    </Box>
  );

  function getSx() {
    return {
      container: {
        position: 'relative',
        width: props.size ?? '100%',
        height: props.size ?? '100%',
      },
      image: [
        {
          borderRadius: '8px',
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          aspectRatio: '1',
          boxShadow: '0 0 12px 0px rgba(0,0,0,0.5)',
        },
      ].concat(props.sx ?? [{}]),
    };
  }
}
