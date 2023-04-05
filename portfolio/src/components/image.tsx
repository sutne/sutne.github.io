import React from 'react';
import { Box } from '@mui/material';




type props = {
  src: string;
  size?: string;
  borderRadius?: string;
  children?: JSX.Element;
}
export function Image({ ...props }: props): JSX.Element {

  const sx = getSx();
  return <Box sx={sx.container}>
    <Box sx={sx.cover} component='img' src={props.src} />
    {props.children}
  </Box>;

  function getSx() {
    return {
      container: [{
        position: 'relative',
        width: props.size ?? '100%',
        height: props.size ?? '100%',
      }],
      cover: [{
        borderRadius: props.borderRadius ?? '8px',
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        aspectRatio: '1',
      }],
    };
  }
}