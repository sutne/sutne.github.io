
import React from 'react';
import { Typography } from '@mui/material';



type title_props = {
  title: string
}
export function SectionTitle({ ...props }: title_props): JSX.Element {
  return <Typography variant="h5" sx={{ margin: "1.4em 0 0.6em 0" }}>
    {props.title}
  </Typography>;
}