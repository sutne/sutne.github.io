import { Box, Grid2 as Grid, alpha } from '@mui/material';
import { useMainTheme } from 'providers/main-theme-provider';
import { type JSX, cloneElement } from 'react';

export function AppDrawer(props: {
  title: string;
  children: JSX.Element | JSX.Element[];
}) {
  const { theme } = useMainTheme();

  const apps = Array.isArray(props.children)
    ? props.children
    : [props.children];

  const sx = getSx();
  return (
    <Box sx={sx.background}>
      <Box sx={sx.title}>{props.title}</Box>
      <Grid sx={sx.drawer} container columnSpacing={2} rowSpacing={2}>
        {apps.map((app, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: no better alternative
          <Grid key={i}>{cloneElement(app, { ...app.props })}</Grid>
        ))}
      </Grid>
    </Box>
  );

  function getSx() {
    return {
      background: [
        {
          borderRadius: '16px',
          transition: 'all ease-in-out 0.125s',
          boxShadow: '3px 3px 10px 1pt rgba(0,0,0, 30%)',
          background: `linear-gradient(0deg, 
            ${alpha(theme.palette.background.default, 0.65)} 60%, 
            ${alpha(theme.palette.background.default, 0.95)} 100%
          )`,
          backdropFilter: 'blur(8px)',
        },
      ],
      drawer: [
        {
          padding: { xs: '12px', sm: '24px' },
        },
      ],
      title: [
        {
          fontWeight: 'bold',
          color: 'text.primary',
          padding: '12px 16px',
          borderRadius: '16px 16px 0px 0px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 20%)',
          background: `linear-gradient(-80deg, 
            ${alpha(theme.palette.background.paper, 0.3)} 60%, 
            ${alpha(theme.palette.background.paper, 0.5)} 100%
          )`,
        },
      ],
    };
  }
}
