import React from 'react';
import { alpha, Avatar, Box, Grid, Typography } from '@mui/material';

import { useMainTheme } from 'providers/main-theme-provider';

export function PersonalCard() {
  const { theme } = useMainTheme();

  const sx = getSx();
  return (
    <Box sx={sx.card}>
      <Grid container spacing={2} alignItems='center' textAlign='center'>
        <Grid item xs={12} sm={4} md={4}>
          <Avatar
            style={{
              width: '45mm',
              height: '45mm',
              margin: 'auto',
              fontSize: '30mm',
              boxShadow: '0px 2px 7px rgba(0, 0, 0, 30%)',
            }}
            src={require('assets/me.png')}
            alt='Sivert Utne'
          />
        </Grid>
        <Grid item xs={12} sm={8} md={8} alignContent={'center'}>
          <Box style={{ padding: '3mm' }}>
            <Typography variant='h4' color='text.primary' marginBottom='3mm'>
              Sivert Utne
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Consultant at Bouvet ASA
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  function getSx() {
    return {
      card: {
        height: 'fit-content',
        display: 'flex',
        background: `linear-gradient(30deg, 
          ${alpha(theme.palette.background.paper, 0.55)} 20%, 
          ${alpha(theme.palette.background.paper, 0.65)} 40%, 
          ${alpha(theme.palette.background.paper, 0.75)} 80%, 
          ${alpha(theme.palette.background.paper, 0.95)} 100%
        )`,
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '3px 3px 10px 1pt rgba(0,0,0, 30%)',
        backdropFilter: 'blur(4px)',
      },
    };
  }
}
