import React from 'react';
import { Theme } from '@mui/material';

import { AppProvider } from 'providers/app-provider';
import { ThemeProvider } from 'providers/theme-provider';

import { AppContent } from './app-content';
import { AppIcon } from './app-icon';

type props = {
  name: string;
  theme?: Theme;
  appBarColor?: string;
  onTap?: () => void;
};
export function App({ ...props }: props & { children?: JSX.Element }) {
  if (!props.children)
    return (
      <AppProvider name={props.name}>
        <AppIcon onTap={props.onTap} />
      </AppProvider>
    );

  return (
    <AppProvider name={props.name}>
      <>
        <AppIcon />
        {props.theme ? (
          <ThemeProvider theme={props.theme}>
            <AppContent appBarColor={props.appBarColor}>
              {props.children}
            </AppContent>
          </ThemeProvider>
        ) : (
          <AppContent>{props.children}</AppContent>
        )}
      </>
    </AppProvider>
  );
}
