import { Box } from '@mui/material';
import type { JSX } from 'react';
import { Shimmer } from './animated/shimmer';

export function Image(props: {
  src?: string;
  size?: any;
  sx?: any;
  objectFit?: string;
  children?: JSX.Element;
}) {
  const sx = getSx();
  return (
    <Box sx={sx.container}>
      <Box sx={{ aspectRatio: 1 }}>
        <Shimmer />
      </Box>
      {props.src && props.src !== '' && (
        <>
          <Box sx={sx.image} component='img' src={props.src} />
          {props.children}
        </>
      )}
    </Box>
  );

  function getSx() {
    return {
      container: [
        {
          position: 'relative',
          width: props.size ?? '100%',
          fontSize: 0,
          lineHeight: 0,
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 0 12px 0px rgba(0,0,0,0.5)',
        },
      ].concat(props.sx ?? [{}]),
      image: {
        position: 'absolute',
        top: 0,
        left: 0,
        objectFit: props.objectFit ?? 'cover',
        width: '100%',
        height: '100%',
      },
    };
  }
}
