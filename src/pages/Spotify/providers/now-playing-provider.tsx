import type React from 'react';
import {
  type JSX,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as API from '../service/api';
import type { NowPlayingType } from '../service/types';
import { useMusicPlayer } from './music-player';

const NowPlayingContext = createContext<
  | {
      track: NowPlayingType | undefined;
      shouldShow: boolean;
      setShouldShow: React.Dispatch<React.SetStateAction<boolean>>;
      refresh: () => Promise<void>;
    }
  | undefined
>(undefined);

export function NowPlayingProvider(props: { children: JSX.Element }) {
  const [track, setTrack] = useState<NowPlayingType>();
  const [shouldShow, setShouldShow] = useState(false);

  const { addSample } = useMusicPlayer();

  const refresh = async () => {
    const response = await API.getNowPlaying();
    if (track?.href === response?.href) return;
    setTrack(response);
    if (response) {
      if (response.sample) addSample(response.sample);
      setShouldShow(true);
    } else {
      setShouldShow(false);
    }
  };

  useEffect(() => {
    refresh(); // Refresh on mount
  }, []);

  return (
    <NowPlayingContext.Provider
      value={{
        track,
        refresh,
        shouldShow,
        setShouldShow,
      }}
    >
      {props.children}
    </NowPlayingContext.Provider>
  );
}

export function useNowPlaying() {
  const context = useContext(NowPlayingContext);
  if (context !== undefined) return context;
  throw new Error('useNowPlaying must be used within a NowPlayingProvider');
}
