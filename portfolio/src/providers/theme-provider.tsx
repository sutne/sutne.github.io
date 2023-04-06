import React, { useState } from 'react';
import { Theme, ThemeProvider as MuiThemeProvider, useMediaQuery } from '@mui/material';

import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';

// Define the Context, which is the values accessible from within the provider
const ThemeContext = React.createContext<undefined |
{
  theme: Theme;
  themeIsDark: boolean;
  swapTheme: () => void;
}
>(undefined);

// Optional Arguments For the provider
type props = {
  theme?: Theme;
};
export function ThemeProvider({ ...props }: props & { children: JSX.Element }) {
  const prefersDarkTheme = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState(
    props.theme ?? (prefersDarkTheme ? darkTheme : lightTheme),
  );

  const swapTheme = () => {
    if (theme === lightTheme) {
      setTheme(darkTheme);
    } else if (theme === darkTheme) {
      setTheme(lightTheme);
    }
  };

  const contextValues = {
    theme,
    themeIsDark: theme === darkTheme,
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




