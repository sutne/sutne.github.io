import React from 'react';
import { Typography } from '@mui/material';

export function Section(props: {
  title: string;
  children: JSX.Element | JSX.Element[];
  padding?: string;
}) {
  const sx = getSx();
  return (
    <>
      <Typography sx={sx.title}>{props.title}</Typography>
      {props.children}
    </>
  );

  function getSx() {
    return {
      title: {
        fontSize: { xs: '1.6rem', sm: '2.5rem' },
        margin: '32px 0 16px 0',
      },
    };
  }
}
