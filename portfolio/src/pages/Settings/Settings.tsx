import React from 'react';
import { Divider, Stack, Typography, useTheme } from '@mui/material';

import { AppContent } from 'components/app-content';
import { useMainTheme } from 'providers/main-theme-provider';
import { useSettings } from 'providers/settings-provider';

import { ToggleItem } from './components/toggle-item';

export function Settings() {
  const { themeIsDark } = useMainTheme();
  const { settings, updateSettings } = useSettings();

  const sx = getSx();
  return (
    <AppContent name='Settings'>
      <Stack sx={sx.container} divider={<Divider />} spacing={1}>
        <ToggleItem
          name='Cookies'
          tooltip={<CookieTooltip />}
          isToggled={settings.allowCookies}
          onChange={() =>
            updateSettings({
              ...settings,
              allowCookies: !settings.allowCookies,
            })
          }
        />
        <ToggleItem
          name='Dark Mode'
          isToggled={themeIsDark}
          onChange={() =>
            updateSettings({
              ...settings,
              useDarkTheme: !themeIsDark,
            })
          }
        />
        <ToggleItem
          name='Animations'
          tooltip={<AnimationTooltip />}
          isToggled={settings.useAnimations}
          onChange={() =>
            updateSettings({
              ...settings,
              useAnimations: !settings.useAnimations,
            })
          }
        />
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

function CookieTooltip() {
  return (
    <>
      <Typography variant='h6'>
        Enabling &apos;Cookies&apos; will allow:
      </Typography>
      <ul>
        <li>
          <Typography>Saving your settings for your next visit.</Typography>
        </li>
        <li>
          <Typography>
            Store loaded data for a more responsive experience.
          </Typography>
        </li>
      </ul>
      <Typography>
        Disabling &apos;Cookies&apos; again will delete all locally stored data
        and restore settings to their default.
      </Typography>
    </>
  );
}

function AnimationTooltip() {
  const theme = useTheme();
  return (
    <>
      <Typography sx={{ color: theme.palette.warning.main, fontSize: '1.3em' }}>
        Work in Progress!
      </Typography>
      <Typography sx={{ marginY: '12px' }}>
        Opening/Closing apps gets misaligned when zooming/resizing the window
        between opening/closing.
      </Typography>
      <Typography>
        When enabled, apps are animated from their icon onto the screen to
        emulate how it would appear on a phone.
      </Typography>
      <Typography>
        Setting does not affect animations when data is loaded/unloaded.
      </Typography>
    </>
  );
}
