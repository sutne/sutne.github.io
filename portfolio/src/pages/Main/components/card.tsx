import React from 'react';
import { alpha, Box } from '@mui/material';

import { useMainTheme } from 'providers/main-theme-provider';

type props = {
  children: JSX.Element | JSX.Element[] | string;
};
export function Card({ ...props }: props) {
  const { theme } = useMainTheme();

  const classes = getClasses();
  return <Box sx={classes.card}>{props.children}</Box>;

  function getClasses() {
    return {
      card: [
        {
          height: 'fit-content',
          display: 'flex',
          background: `linear-gradient(-70deg, 
            ${alpha(theme.palette.background.paper, 0.85)} 60%, 
            ${alpha(theme.palette.background.paper, 0.95)} 100%)
          `,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '3px 3px 10px 1pt rgba(0,0,0, 30%)',
        },
      ],
    };
  }
}
