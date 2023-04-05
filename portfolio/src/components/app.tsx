import React from 'react';

import { AppProvider } from 'providers/app-provider';

import { AppContent } from './app-content';
import { AppIcon } from './app-icon';


type props = {
  name: string;
};
export function App({ ...props }: props & { children: JSX.Element }) {
  return (
    <AppProvider name={props.name}>
      <>
        <AppIcon />
        <AppContent>
          {props.children}
        </AppContent>
      </>
    </AppProvider>
  );
}