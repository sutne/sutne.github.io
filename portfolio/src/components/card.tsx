import React from 'react';
import { Box } from '@mui/material';

type props = {
  children: JSX.Element | JSX.Element[] | string;
};
export function Card({ ...props }: props) {
  const classes = getClasses();

  return (
    <Box sx={classes.card}>
      {props.children}
    </Box>
  );

  function getClasses() {
    return {
      card: [
        {
          height: 'fit-content',
          margin: '8px',
          display: 'flex',
          backgroundImage: 'linear-gradient(-70deg, rgba(240,240,240,0.85) 60%, rgba(240,240,240,0.95) 100%)',
          borderRadius: '16px',
          padding: '24px',
          transition: 'all ease-in-out 0.125s',
          boxShadow: '3px 3px 10px 1pt rgba(0,0,0, 30%)',
          // transform: "scale(1)",
          '&:hover': {
            // transform: "scale(1.01)",
            boxShadow: '5px 5px 12px 2pt rgba(0,0,0, 20%)',
          },
        },
      ],
    };
  }
}