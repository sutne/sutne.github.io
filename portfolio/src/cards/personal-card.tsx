import React from 'react';
import { Avatar, Box, Grid, Typography } from '@mui/material';

import { Card } from 'components/card';

export function PersonalCard() {
  return (
    <Card>
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
              Completing my M.Sc Computer Science Degree at NTNU in Trondheim
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
