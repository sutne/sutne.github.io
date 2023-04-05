import React from 'react';
import { Typography } from '@mui/material';



type props = {
  children: string,
  sx?: any,
}
export function ItemSubtitle({ ...props }: props): JSX.Element {

  const sx = getSx();
  return (
    <Typography sx={sx}>
      {props.children}
    </Typography>
  );

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