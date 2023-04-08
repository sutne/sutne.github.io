import React from 'react';
import { alpha, Box, Grid } from '@mui/material';

import { useTheme } from 'providers/theme-provider';

type props = {
  title: string;
  children: JSX.Element[] | JSX.Element;
};
export function AppDrawer({ ...props }: props) {
  const { theme } = useTheme();

  if (!Array.isArray(props.children)) props.children = [props.children];

  const sx = getSx();
  return (
    <Box sx={sx.card}>
      <Box sx={sx.title}>{props.title}</Box>
      <Grid container sx={sx.drawer} columnSpacing={1} rowSpacing={2}>
        {props.children.map((child, index) => (
          <Grid item key={index}>
            {React.cloneElement(child, { ...child.props })}
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  function getSx() {
    return {
      card: [
        {
          overflow: 'hidden',
          backgroundImage: `linear-gradient(-70deg, ${alpha(
            theme.palette.background.default,
            0.85,
          )} 60%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
          borderRadius: '16px',
          transition: 'all ease-in-out 0.125s',
          boxShadow: '3px 3px 10px 1pt rgba(0,0,0, 30%)',
        },
      ],
      drawer: [
        {
          padding: '24px',
        },
      ],
      title: [
        {
          fontWeight: 'bold',
          color: 'text.primary',
          padding: '12px 16px',
          backgroundImage: `linear-gradient(70deg,  ${alpha(
            theme.palette.background.paper,
            0.75,
          )} 60%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 20%)',
        },
      ],
    };
  }
}
