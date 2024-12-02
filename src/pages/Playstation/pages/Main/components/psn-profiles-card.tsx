import React from 'react';
import { Box, Stack } from '@mui/material';

export function PsnProfilesCard() {
  return (
    <Stack>
      <Box
        sx={{
          width: '100%',
          borderRadius: '12px',
        }}
        component='img'
        src='https://card.psnprofiles.com/2/Sutne_.png'
      />
    </Stack>
  );
}
