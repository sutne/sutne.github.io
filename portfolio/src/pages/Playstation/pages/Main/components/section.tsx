import React from 'react';
import { Box, Typography } from '@mui/material';

export function Section(props: {
  title: string;
  children: JSX.Element | JSX.Element[];
  padding?: string;
}) {
  const sx = getSx();
  return (
    <>
      <Typography sx={sx.title}>{props.title}</Typography>
      <Box sx={sx.card}>{props.children}</Box>
    </>
  );

  function getSx() {
    return {
      title: {
        fontSize: { xs: '1.6rem', sm: '2.5rem' },
        margin: '32px 0 16px 0',
      },
      card: {
        bgcolor: 'background.paper',
        borderRadius: '16px',
        padding: props.padding ?? '24px',
      },
    };
  }
}
