import { Box, Stack, Typography } from '@mui/material';
import { ShimmerImage, ShimmerText } from 'components/animated/shimmer';
import type { Profile } from '../../../service/types';

export function ProfileOverview(props: { profile: Profile | undefined }) {
  const sx = getSx();

  const avatar = () => {
    if (!props.profile) {
      return (
        <ShimmerImage
          width={sx.avatar.width}
          sx={{
            borderRadius: sx.avatar.borderRadius,
          }}
        />
      );
    }
    return <Box component='img' sx={sx.avatar} src={props.profile.avatar} />;
  };

  const onlineId = () => {
    if (!props.profile) {
      return (
        <Box width={{ xs: '96px', sm: '128px', md: '256px' }}>
          <ShimmerText fontSize={sx.onlineId.fontSize} width='100%' />
        </Box>
      );
    }
    return <Typography sx={sx.onlineId}>{props.profile.onlineId}</Typography>;
  };

  return (
    <Stack
      direction={'row'}
      spacing={3}
      alignItems={'center'}
      justifyContent={'center'}
      marginBottom='-32px'
    >
      {avatar()}
      {onlineId()}
    </Stack>
  );

  function getSx() {
    return {
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
}
