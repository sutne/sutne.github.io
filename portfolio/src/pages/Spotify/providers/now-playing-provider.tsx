import React, { useEffect, useState } from 'react';

import * as API from '../service/api';
import { NowPlayingType } from '../service/types';
import { useMusicPlayer } from './music-player';

const NowPlayingContext = React.createContext<undefined |
{
  track: NowPlayingType | undefined;
  shouldShow: boolean;
  setShouldShow: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: () => Promise<void>;
}
>(undefined);

type props = object;
export function NowPlayingProvider({ ...props }: props & { children: JSX.Element }) {
  const [track, setTrack] = useState<NowPlayingType | undefined>(undefined);
  const [shouldShow, setShouldShow] = useState(false);

  const { addSample } = useMusicPlayer();

  const refresh = async () => {
    const response = await API.getNowPlaying().catch((err) => console.error(err));
    if (track?.href == response?.href) return;
    setTrack(response ?? undefined);
    if (!response) return;
    addSample(response.sample);
    setShouldShow(true);
  };

  useEffect(() => {
    refresh(); // Refresh on mount
  }, []);

  const contextValues = {
    track,
    refresh,
    shouldShow,
    setShouldShow,
  };
  return (
    <NowPlayingContext.Provider value={contextValues}>
      {props.children}
    </NowPlayingContext.Provider>
  );
}

export function useNowPlaying() {
  const context = React.useContext(NowPlayingContext);
  if (context === undefined) {
    throw new Error('useNowPlaying must be used within a NowPlayingProvider');
  }
  return { ...context };
}