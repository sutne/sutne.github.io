import { Typography } from '@mui/material';
import type { Platform } from '../service/types';

export function PlatformChip(props: { platform: Platform }) {
  if (!props.platform) return <></>;

  const sx = getSx();
  return <Typography sx={sx.platform}>{props.platform}</Typography>;
  function getSx() {
    return {
      platform: {
        bgcolor: props.platform === 'PS5' ? 'white' : 'black',
        color: props.platform === 'PS5' ? 'black' : 'white',
        borderRadius: '8px',
        padding: { xs: '1px 5px', sm: '0 8px' },
        fontSize: { xs: '0.4rem', sm: '0.8rem' },
        fontWeight: 400,
        boxShadow:
          props.platform === 'PS5'
            ? '0 1px 6px 2px rgba(0,0,0,0.3)'
            : '0 1px 6px 2px rgba(255,255,255,0.15)',
      },
    };
  }
}
