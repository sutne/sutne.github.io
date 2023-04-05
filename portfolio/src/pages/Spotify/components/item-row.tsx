import React from 'react';
import { Box, Stack } from '@mui/material';

import { useTheme } from 'providers/theme-provider';



type props = {
  children: JSX.Element[];
}
export function ItemRow({ ...props }: props): JSX.Element {
  const { theme } = useTheme();

  const style = {
    overflowX: 'auto',
    paddingY: '0.5em',
    '&::-webkit-scrollbar': {
      height: { xs: '0.4em', sm: '0.8em' },
      bgcolor: 'rgba(0,0,0,0)',
    },
    '&::-webkit-scrollbar-thumb': {
      bgcolor: 'background.paper',
      borderRadius: { xs: '0.4em', sm: '0.8em' },
    },
  };
  const container = {
    position: 'relative',
    marginRight: '-4mm',
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 1,
      pointerEvents: 'none',
      width: '100%',
      height: '95%',
      backgroundImage: `linear-gradient(to right, ${theme.palette.background.default}, rgba(0, 0, 0, 0) 1% 98%, ${theme.palette.background.default})`,
    },
  };
  return <Box sx={container}>
    <Stack direction='row' spacing={3} sx={style}>
      {props.children}
    </Stack>
  </Box>;

}