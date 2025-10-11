import { Divider, Stack } from '@mui/material';
import { AppContent } from 'components/app-content';
import { useMainTheme } from 'providers/main-theme-provider';
import { useSettings } from 'providers/settings-provider';
import { usePhoneAccelerometer } from '../../providers/phone-accelerometer-provider';
import { ToggleItem } from './components/toggle-item';

export function Settings() {
  const { themeIsDark } = useMainTheme();
  const { settings, updateSettings } = useSettings();
  const phoneOrientation = usePhoneAccelerometer();

  const sx = getSx();
  return (
    <AppContent name='Settings'>
      <Stack sx={sx.container} divider={<Divider />} spacing={1}>
        <ToggleItem
          name='Cookies'
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
          isToggled={settings.useAnimations}
          onChange={() =>
            updateSettings({
              ...settings,
              useAnimations: !settings.useAnimations,
            })
          }
        />
        {phoneOrientation.requiresAccess && (
          <ToggleItem
            name='Access to Accelerometer'
            disabled={phoneOrientation.hasAccess}
            isToggled={phoneOrientation.hasAccess}
            onChange={() => phoneOrientation.requestAccess()}
          />
        )}
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
