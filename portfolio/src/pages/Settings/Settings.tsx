import React from 'react';
import { Divider, Stack, Typography } from '@mui/material';

import { App } from 'components/app';
import { useTheme } from 'providers/theme-provider';

import { ToggleSwitch } from './components/toggle-switch';

export function Settings() {
  const { themeIsDark, swapTheme } = useTheme();

  const sx = getSx();
  return (
    <App name='Settings'>
      <Stack sx={sx.container} divider={<Divider />}>
        <ToggleItem name='Dark Mode' isOn={themeIsDark} onChange={swapTheme} />
      </Stack>
    </App>
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
