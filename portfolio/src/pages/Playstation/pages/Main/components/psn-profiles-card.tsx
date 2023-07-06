import React from 'react';
import { Box, Stack } from '@mui/material';

export function PsnProfilesCard() {
  return (
    <Stack>
      <Box
        style={{
          minWidth: '500px',
          maxWidth: '100%',
          borderRadius: '8px',
        }}
        component='img'
        src='https://card.psnprofiles.com/2/Sutne_.png'
      />
    </Stack>
  );
}
