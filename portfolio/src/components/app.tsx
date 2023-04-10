import React from 'react';
import { Theme } from '@mui/material';

import { AppProvider } from 'providers/app-provider';

import { AppContent } from './app-content';
import { AppIcon } from './app-icon';

export type AppBarTheme = {
  background: string;
  textColor: string;
};

type props = {
  name: string;
  onTap?: () => void;
  theme?: Theme;
  lightTheme?: Theme;
  darkTheme?: Theme;
  appBarTheme?: AppBarTheme;
};
export function App({ ...props }: props & { children?: JSX.Element }) {
  if (!props.children) {
    return (
      <AppProvider
        name={props.name}
        theme={props.theme}
        lightTheme={props.lightTheme}
        darkTheme={props.darkTheme}
      >
        <AppIcon onTap={props.onTap} />
      </AppProvider>
    );
  }

  return (
    <AppProvider
      name={props.name}
      theme={props.theme}
      lightTheme={props.lightTheme}
      darkTheme={props.darkTheme}
    >
      <>
        <AppIcon onTap={props.onTap} />
        <AppContent appBarTheme={props.appBarTheme}>
          {props.children}
        </AppContent>
      </>
    </AppProvider>
  );
}
