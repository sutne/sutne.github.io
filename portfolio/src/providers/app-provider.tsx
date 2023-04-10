import React, { createRef, useEffect, useState } from 'react';
import { Theme, ThemeProvider as MuiThemeProvider } from '@mui/material';

import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';
import { useMainTheme } from './main-theme-provider';

const AppContext = React.createContext<
  | {
      theme: Theme;
      name: string;
      isOpen: boolean;
      open: () => void;
      close: () => void;
      iconReference: React.RefObject<HTMLImageElement>;
    }
  | undefined
>(undefined);

type props = {
  name: string;
  theme?: Theme;
  lightTheme?: Theme;
  darkTheme?: Theme;
};
export function AppProvider({ ...props }: props & { children: JSX.Element }) {
  const [isOpen, setIsOpen] = useState(false);

  const { themeIsDark } = useMainTheme();
  const themeThatIsDark = props.theme ?? props.darkTheme ?? darkTheme;
  const themeThatIsLight = props.theme ?? props.lightTheme ?? lightTheme;

  const [theme, setTheme] = useState(
    themeIsDark ? themeThatIsDark : themeThatIsLight,
  );

  useEffect(() => {
    setTheme(themeIsDark ? themeThatIsDark : themeThatIsLight);
  }, [themeIsDark]);

  const contextValues = {
    theme,
    name: props.name,
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    iconReference: createRef<HTMLImageElement>(),
  };

  return (
    <AppContext.Provider value={contextValues}>
      <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within a AppProvider');
  }
  return { ...context };
}
