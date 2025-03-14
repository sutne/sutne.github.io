import { useEffect, useState } from 'react';

export function useSessionState<T>(key: string, defaultValue: T) {
  return useStorageState(sessionStorage, key, defaultValue);
}

export function useLocalState<T>(key: string, defaultValue: T) {
  return useStorageState(localStorage, key, defaultValue);
}

function useStorageState<T>(storage: Storage, key: string, defaultValue: T) {
  const initialValue: T = getItem(storage, key, defaultValue);
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    if (state === undefined) {
      storage.removeItem(key);
    } else {
      storage.setItem(key, JSON.stringify(state));
    }
  }, [storage, key, state]);

  return [state, setState] as const;
}

function getItem<T>(storage: Storage, key: string, defaultValue: T): T {
  const preservedState = storage.getItem(key);
  if (preservedState === null) return defaultValue;
  return JSON.parse(preservedState);
}
