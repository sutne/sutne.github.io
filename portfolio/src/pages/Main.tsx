import React from 'react';
import { Box, Typography } from '@mui/material';

import { Card } from 'components/card';
import { Center } from 'components/center';
import { Email, Hyperlink } from 'components/hyperlink';
import { ProfilePicture } from 'components/profile-picture';

export function Main() {
  return (
    <Box>
        <Card >
          <Center>
            <ProfilePicture/>
            <Typography variant="h4">Sivert Utne</Typography>
            <Email>sivertutne@gmail.com</Email>
          </Center>
        </Card>
        <Card >
          <Center>
            <Typography variant="body1">Play my 
              <Hyperlink text="minimalistic games!" url="https://sutne.github.io/games"/>
            </Typography>
          </Center>
        </Card>
    </Box>
  );
}