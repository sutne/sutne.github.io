import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { App } from 'components/app';
import { useTheme } from 'providers/theme-provider';

import { ToggleSwitch } from './components/toggle-switch';


export function ToggleDarkMode() {
  const { themeIsDark, swapTheme } = useTheme();

  return (
    <App name='Settings'>
      <ToggleItem name='Dark Mode' isOn={themeIsDark} onChange={swapTheme} />
    </App>
  );
}


type ToggleItemProps = {
  name: string;
  isOn: boolean;
  onChange: () => void;
}
function ToggleItem({ ...props }: ToggleItemProps) {

  const sx = getSx();
  return (
    <Stack direction='row'>
      <Typography sx={sx.name} variant='h5'>{props.name}</Typography>
      <ToggleSwitch isOn={props.isOn} onChange={props.onChange} />
    </Stack>
  );

  function getSx() {
    return {
      name: {
        flexGrow: 1,
        alignSelf: 'center',
      },
    };
  }
}