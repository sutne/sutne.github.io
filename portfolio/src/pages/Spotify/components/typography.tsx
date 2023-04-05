
import React from 'react';
import { Typography } from '@mui/material';



type title_props = {
  title: string
}
export function SectionTitle({ ...props }: title_props): JSX.Element {

  const sx = getSx();
  return <Typography variant='h4' sx={sx.title}>
    {props.title}
  </Typography>;

  function getSx() {
    return {
      title: [{
        margin: '1.4em 0 0.6em 0',
      }],
    };
  }
}