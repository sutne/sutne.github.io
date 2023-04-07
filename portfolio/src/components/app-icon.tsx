import React from 'react';
import { Box } from '@mui/material';

import { useApp } from 'providers/app-provider';

type props = {
  onTap?: () => void;
};
export function AppIcon({ ...props }: props) {
  const { name, open, iconReference } = useApp();

  const sx = getSx();
  return (
    <Box
      sx={sx.container}
      onClick={() => (props.onTap ? props.onTap() : open())}
    >
      <Box
        ref={iconReference}
        sx={sx.icon}
        component='img'
        src={require(`assets/apps/${name}.png`)}
      />
      <Box sx={sx.name}>{name}</Box>
    </Box>
  );

  function getSx() {
    return {
      container: [
        {
          width: { xs: '18mm', sm: '22mm' },
          height: 'fit-content',
          textAlign: 'center',
          cursor: 'pointer',
          position: 'relative',
          transition: 'all ease-in-out 0.125s',
          transform: 'scale(1)',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      ],
      icon: [
        {
          width: { xs: '16mm', sm: '18mm' },
          aspectRatio: '1',
          borderRadius: '25%',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 30%)',
        },
      ],
      name: [
        {
          color: 'text.primary',
          textWrap: 'wrap',
          overflowWrap: 'break-word',
          fontSize: { xs: '0.7em', sm: '0.8em' },
          marginTop: { xs: '0.5mm', sm: '1mm' },
        },
      ],
    };
  }
}
