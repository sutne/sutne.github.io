import { useEffect, useState } from 'react';

export function useSessionState<T>(
  key: string,
  defaultValue: T,
  preserveState = true,
) {
  const [state, setState] = useState<T>(
    preserveState ? getInitialValue(key, defaultValue) : defaultValue,
  );

  useEffect(() => {
    if (preserveState) {
      sessionStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, preserveState, state]);

  return [state, setState] as const;
}

function getInitialValue<T>(key: string, defaultValue: T): T {
  const preservedState = sessionStorage.getItem(key);
  if (preservedState === null) return defaultValue;
  return JSON.parse(preservedState);
}
