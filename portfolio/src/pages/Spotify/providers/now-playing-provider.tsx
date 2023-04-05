import React, { useEffect, useState } from 'react';

import * as API from '../service/api';
import { NowPlayingType } from '../service/types';
import { useMusicPlayer } from './music-player';

const NowPlayingContext = React.createContext<undefined |
{
  track: NowPlayingType | undefined;
  shouldShow: boolean;
  setShouldShow: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: () => void;
}
>(undefined);

type props = object;
export function NowPlayingProvider({ ...props }: props & { children: JSX.Element }) {
  const [track, setTrack] = useState<NowPlayingType | undefined>(undefined);
  const [shouldShow, setShouldShow] = useState(false);

  const { addSample } = useMusicPlayer();

  const refresh = async () => {
    setTrack(undefined);
    const response = await API.getNowPlaying();
    setTrack(response);
    if (!response) return;
    setShouldShow(true);
    addSample(response.sample);
  };

  useEffect(() => {
    refresh();
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