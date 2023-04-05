import React, { useState } from 'react';

const AppContext = React.createContext<undefined |
{
  name: string;
  isOpen: boolean;
  open: () => void;
  close: () => void;
}
>(undefined);

type props = { name: string };
export function AppProvider({ ...props }: props & { children: JSX.Element }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const name = props.name;
  const contextValues = {
    name,
    isOpen,
    open,
    close,
  };
  return (
    <AppContext.Provider value={contextValues}>
      {props.children}
    </AppContext.Provider>
  );
}

// This is the hook that will be used to access the context
export function useApp() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppmust be used within a AppProvider');
  }
  return { ...context };
}