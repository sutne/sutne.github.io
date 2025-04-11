import { Box, Stack, Typography } from '@mui/material';
import { ShimmerImage, ShimmerText } from 'components/animated/shimmer';
import type { Profile } from '../../../service/types';

export function ProfileOverview(props: { profile: Profile }) {
  const sx = getSx();
  return (
    <Stack direction='row' spacing={3} sx={sx.container}>
      <Box component='img' sx={sx.avatar} src={props.profile.avatar} />
      <Typography sx={sx.onlineId}>{props.profile.onlineId}</Typography>
    </Stack>
  );
}

export function ProfileOverviewShimmer() {
  const sx = getSx();
  return (
    <Stack direction='row' spacing={3} sx={sx.container}>
      <ShimmerImage
        width={sx.avatar.width}
        sx={{ borderRadius: sx.avatar.borderRadius }}
      />
      <Box width={{ xs: '96px', sm: '128px', md: '256px' }}>
        <ShimmerText fontSize={sx.onlineId.fontSize} width='100%' />
      </Box>
    </Stack>
  );
}

function getSx() {
  return {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '-32px',
    },
    avatar: {
      width: { xs: '60px', sm: '100px' },
      borderRadius: { xs: '80px', sm: '120px' },
      aspectRatio: 1,
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
