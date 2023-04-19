import React from 'react';
import { Avatar, Stack, Typography } from '@mui/material';

import { Profile } from '../../../service/types';

export function ProfileOverview({ ...props }: { profile: Profile }) {
  const sx = getSx();
  return (
    <Stack
      direction={'row'}
      spacing={3}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Avatar sx={sx.avatar} src={props.profile.avatar} />
      <Typography sx={sx.onlineId}>{props.profile.onlineId}</Typography>
    </Stack>
  );

  function getSx() {
    return {
      avatar: {
        width: { xs: '80px', sm: '120px' },
        height: { xs: '80px', sm: '120px' },
      },
      onlineId: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: { xs: '24px', md: '42px' },
        fontWeight: 300,
        marginTop: '16px',
      },
    };
  }
}
