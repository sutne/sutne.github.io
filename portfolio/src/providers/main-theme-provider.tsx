import React from 'react';
import {
  Theme,
  ThemeProvider as MuiThemeProvider,
  useMediaQuery,
} from '@mui/material';

import { useSettings } from 'providers/settings-provider';
import { darkTheme } from 'themes/darkTheme';
import { lightTheme } from 'themes/lightTheme';

const MainThemeContext = React.createContext<
  | {
      theme: Theme;
      themeIsDark: boolean;
      swapTheme: () => void;
    }
  | undefined
>(undefined);

export function MainThemeProvider(props: { children: JSX.Element }) {
  const prefersDarkTheme = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = React.useState(
    prefersDarkTheme ? darkTheme : lightTheme,
  );

  const { settings } = useSettings();
  React.useEffect(() => {
    if (settings.useDarkTheme !== undefined) {
      setTheme(settings.useDarkTheme ? darkTheme : lightTheme);
    } else {
      setTheme(prefersDarkTheme ? darkTheme : lightTheme);
    }
  }, [settings.useDarkTheme]);

  const themeIsDark = theme === darkTheme;

  const swapTheme = () => {
    const newTheme = themeIsDark ? lightTheme : darkTheme;
    setTheme(newTheme);
  };

  return (
    <MainThemeContext.Provider
      value={{
        theme,
        themeIsDark,
        swapTheme,
      }}
    >
      <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
    </MainThemeContext.Provider>
  );
}

export function useMainTheme() {
  const context = React.useContext(MainThemeContext);
  if (context !== undefined) return { ...context };
  throw new Error('useTheme must be used within a ThemeProvider');
}
