import React from 'react';
import { Grid, Typography } from '@mui/material';

import { Card } from 'components/card';
import { ProfilePicture } from 'components/profile-picture';

export function PersonalCard() {
  return <Card >
    <Grid
      container
      spacing={2}
      alignItems="center"
      textAlign="center"
    >
      <Grid item
        xs={12} sm={4} md={4}>
        <ProfilePicture />
      </Grid>
      <Grid item
        xs={12} sm={8} md={8}
        alignContent={"center"}>
        <Typography variant="h4" color="rgb(0,0,0,80%)" marginBottom="2mm">
          Sivert Utne
        </Typography>
        <Typography variant="body1" color="rgb(0,0,0,60%)">
          Completing my M.Sc Computer Science Degree at NTNU in Trondheim
        </Typography>
      </Grid>
    </Grid>
  </Card>
}