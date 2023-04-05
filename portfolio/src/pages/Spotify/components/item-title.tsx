import React from 'react';
import { Typography } from '@mui/material';



type props = {
  children: string,
  sx?: any,
}
export function ItemTitle({ ...props }: props): JSX.Element {

  const sx = getSx();
  return <Typography sx={sx}>{props.children}</Typography>;

  function getSx() {
    return [
      {
        fontSize: '1.1em',
        color: 'text.primary',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    ].concat(props.sx ?? [{}]);
  }
}
