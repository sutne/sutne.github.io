import { createContext, type JSX, useContext, useState } from 'react';
import {
  deleteAllCookies,
  getCookies,
  updateCookieSettings,
} from 'service/cookies';

export type Settings = {
  allowCookies: boolean;
  useDarkTheme: boolean | undefined;
  useAnimations: boolean;
  animationDuration: number;
};

const defaultSettings: Settings = {
  allowCookies: false,
  useDarkTheme: undefined, // undefined = use system theme
  useAnimations: false, // until i have fixed the animation issues
  animationDuration: 400, // future setting of adjusting, not just turning on/off
};

const SettingsContext = createContext<
  | undefined
  | {
      settings: Settings;
      updateSettings: (settings: Settings) => void;
    }
>(undefined);

export function SettingsProvider(props: { children: JSX.Element }) {
  const [settings, setSettings] = useState<Settings>(
    getCookies('settings', defaultSettings),
  );

  const updateSettings = (newSettings: Settings) => {
    if (newSettings.allowCookies) {
      updateCookieSettings('settings', newSettings);
    } else if (settings.allowCookies) {
      // user disabled cookies
      deleteAllCookies();
      setSettings(defaultSettings);
      return;
    }
    setSettings(newSettings);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context !== undefined) return context;
  throw new Error('useCookies must be used within a CookieProvider');
}
