import { Typography } from '@mui/material';
import type { Platform } from '../service/types';

export function PlatformChip(props: { platform: Platform }) {
  const sx = getSx();
  return <Typography sx={sx.platform}>{props.platform}</Typography>;
  function getSx() {
    return {
      platform: {
        bgcolor: props.platform === 'PS5' ? 'white' : 'black',
        color: props.platform === 'PS5' ? 'black' : 'white',
        borderRadius: '0.5em',
        fontSize: '1em',
        padding: '0 0.8em',
        cursor: 'inherit',
        boxShadow: `
            inset 0em 0.2em 0.8em -0.3em rgba(255,255,255,0.4), 
            inset 0em -0.2em 0.8em -0.3em rgba(0,0,0,0.8),
            ${
              props.platform === 'PS5'
                ? '0 0 0.1em 0 rgba(0,0,0,0.3)'
                : '0 0 0.1em 0 rgba(255,255,255,0.15)'
            }
          `,
      },
    };
  }
}
