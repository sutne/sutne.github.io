import { Typography } from '@mui/material';
import type { JSX } from 'react';

export function Section(props: {
  title: string;
  children: JSX.Element | JSX.Element[];
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
