import {
  ThemeProvider as MuiThemeProvider,
  type Theme,
  useMediaQuery,
} from '@mui/material';
import { useSettings } from 'providers/settings-provider';
import {
  createContext,
  type JSX,
  useContext,
  useEffect,
  useState,
} from 'react';
import { darkTheme } from 'themes/darkTheme';
import { lightTheme } from 'themes/lightTheme';

const MainThemeContext = createContext<
  | {
      theme: Theme;
      themeIsDark: boolean;
      swapTheme: () => void;
    }
  | undefined
>(undefined);

export function MainThemeProvider(props: { children: JSX.Element }) {
  const prefersDarkTheme = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState(prefersDarkTheme ? darkTheme : lightTheme);

  const { settings } = useSettings();
  useEffect(() => {
    if (settings.useDarkTheme !== undefined) {
      setTheme(settings.useDarkTheme ? darkTheme : lightTheme);
    } else {
      setTheme(prefersDarkTheme ? darkTheme : lightTheme);
    }
  }, [settings.useDarkTheme, prefersDarkTheme]);

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
  const context = useContext(MainThemeContext);
  if (context !== undefined) return context;
  throw new Error('useTheme must be used within a ThemeProvider');
}
