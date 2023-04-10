import React, { useState } from 'react';
import {
  Theme,
  ThemeProvider as MuiThemeProvider,
  useMediaQuery,
} from '@mui/material';

import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';

const MainThemeContext = React.createContext<
  | {
      theme: Theme;
      themeIsDark: boolean;
      swapTheme: () => void;
    }
  | undefined
>(undefined);

type props = { children: JSX.Element };
export function MainThemeProvider({ children }: props) {
  const prefersDarkTheme = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState(prefersDarkTheme ? darkTheme : lightTheme);
  const themeIsDark = theme === darkTheme;

  const contextValues = {
    theme,
    themeIsDark,
    swapTheme: () => (themeIsDark ? setTheme(lightTheme) : setTheme(darkTheme)),
  };

  return (
    <MainThemeContext.Provider value={contextValues}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </MainThemeContext.Provider>
  );
}

export function useMainTheme() {
  const context = React.useContext(MainThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return { ...context };
}
