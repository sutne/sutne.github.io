import React from 'react';

import * as API from '../service/api';
import { NowPlayingType } from '../service/types';
import { useMusicPlayer } from './music-player';

const NowPlayingContext = React.createContext<
  | {
      track: NowPlayingType | undefined;
      shouldShow: boolean;
      setShouldShow: React.Dispatch<React.SetStateAction<boolean>>;
      refresh: () => Promise<void>;
    }
  | undefined
>(undefined);

export function NowPlayingProvider(props: { children: JSX.Element }) {
  const [track, setTrack] = React.useState<NowPlayingType>();
  const [shouldShow, setShouldShow] = React.useState(false);

  const { addSample } = useMusicPlayer();

  const refresh = async () => {
    const response = await API.getNowPlaying();
    if (track?.href === response?.href) return;
    setTrack(response ?? undefined);
    if (!response) return;
    addSample(response.sample);
    setShouldShow(true);
  };

  React.useEffect(() => {
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
  const context = React.useContext(NowPlayingContext);
  if (context !== undefined) return { ...context };
  throw new Error('useNowPlaying must be used within a NowPlayingProvider');
}
