import React, { useState } from 'react';
import {
  Theme,
  ThemeProvider as MuiThemeProvider,
  useMediaQuery,
} from '@mui/material';

import { darkTheme, lightTheme } from './themes';

type props = {
  children: JSX.Element;
  theme?: Theme;
};
const ThemeContext = React.createContext<
  | {
    theme: Theme;
    swapTheme: () => void;
  }
  | undefined
>(undefined);
export function ThemeProvider({ ...props }: props) {
  const prefersDarkTheme = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState(
    props.theme ?? (!prefersDarkTheme ? darkTheme : lightTheme),
  );

  const swapTheme = () => {
    if (theme === lightTheme) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  };

  const contextValues = {
    theme,
    swapTheme,
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