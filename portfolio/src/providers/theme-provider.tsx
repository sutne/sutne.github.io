import React, { useState } from 'react';
import {
  Theme,
  ThemeProvider as MuiThemeProvider,
  useMediaQuery,
} from '@mui/material';

import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';

const ThemeContext = React.createContext<
  | {
      theme: Theme;
      themeIsDark: boolean;
      swapTheme: () => void;
    }
  | undefined
>(undefined);

type props = {
  theme?: Theme;
};
export function ThemeProvider({ ...props }: props & { children: JSX.Element }) {
  const prefersDarkTheme = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState(
    props.theme ?? (prefersDarkTheme ? darkTheme : lightTheme),
  );

  const contextValues = {
    theme,
    themeIsDark: theme === darkTheme,
    swapTheme: () => {
      if (theme === lightTheme) {
        setTheme(darkTheme);
      } else if (theme === darkTheme) {
        setTheme(lightTheme);
      }
    },
  };

  return (
    <ThemeContext.Provider value={contextValues}>
      <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return { ...context };
}
