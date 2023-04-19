import React from 'react';
import { Divider, Stack, Typography } from '@mui/material';

import { AppContent } from 'components/app-content';
import { useMainTheme } from 'providers/main-theme-provider';

import { ToggleSwitch } from './components/toggle-switch';

export function Settings() {
  const { themeIsDark, swapTheme } = useMainTheme();

  const sx = getSx();
  return (
    <AppContent name='Settings'>
      <Stack sx={sx.container} divider={<Divider />}>
        <ToggleItem name='Dark Mode' isOn={themeIsDark} onChange={swapTheme} />
      </Stack>
    </AppContent>
  );

  function getSx() {
    return {
      container: {
        padding: '1em',
      },
    };
  }
}

type ToggleItemProps = {
  name: string;
  isOn: boolean;
  onChange: () => void;
};
function ToggleItem({ ...props }: ToggleItemProps) {
  const sx = getSx();
  return (
    <Stack sx={sx.row} direction='row' onClick={props.onChange}>
      <Typography sx={sx.name} variant='h5'>
        {props.name}
      </Typography>
      <ToggleSwitch isOn={props.isOn} onChange={props.onChange} />
    </Stack>
  );

  function getSx() {
    return {
      row: {
        paddingY: '1mm',
      },
      name: {
        flexGrow: 1,
        fontSize: '1.2rem',
        fontWeight: 300,
        alignSelf: 'center',
      },
    };
  }
}
