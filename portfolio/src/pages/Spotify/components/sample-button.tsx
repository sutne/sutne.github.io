import React from 'react';
import { Pause, PlayArrow } from '@mui/icons-material';
import { IconButton, SvgIconTypeMap, useTheme } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { useMusicPlayer } from '../providers/music-player';

type MuiIcon = OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
  muiName: string;
};
type props = {
  sample: string;
  show: boolean;
  playIcon?: MuiIcon;
  pauseIcon?: MuiIcon;
};
export function SampleButton({ ...props }: props): JSX.Element {
  const theme = useTheme();
  const { isPlaying, handlePlayPause } = useMusicPlayer();

  const showButton = props.show || isPlaying(props.sample);
  const Icon = isPlaying(props.sample)
    ? props.pauseIcon ?? Pause
    : props.playIcon ?? PlayArrow;

  const sx = getSx();
  return (
    <IconButton sx={sx.button} onClick={() => handlePlayPause(props.sample)}>
      <Icon sx={sx.button_icon} />
    </IconButton>
  );

  function getSx() {
    return {
      button: [
        {
          position: 'absolute',
          right: '5%',
          bottom: '5%',
          height: '30%',
          width: '30%',
          transition: 'all 300ms ease-in-out',
          bgcolor: theme.palette.primary.main,
          opacity: '0%',
          boxShadow: '0 12px 12px 0px rgba(0,0,0,0.4)',
          transform: 'translate(0,3mm)',
          '&:hover': {
            transition: 'all 120ms ease',
            bgcolor: theme.palette.primary.light,
            transform: 'scale(1.07) ',
          },
        },
        showButton && {
          opacity: '100%',
          transform: 'translate(0,0)',
        },
      ],
      button_icon: {
        color: theme.palette.background.paper,
        fontSize: '1.3em',
      },
    };
  }
}
