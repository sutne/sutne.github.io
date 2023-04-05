import React, { useEffect, useState } from 'react';

import * as API from '../service/api';
import { NowPlayingType } from '../service/types';
import { useMusicPlayer } from './music-player';

const NowPlayingContext = React.createContext<undefined |
{
  track: NowPlayingType | undefined;
  loading: boolean;
  refresh: () => void;
}
>(undefined);

type props = object;
export function NowPlayingProvider({ ...props }: props & { children: JSX.Element }) {
  const [track, setTrack] = useState<NowPlayingType | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const { addSample } = useMusicPlayer();

  const refresh = async () => {
    setLoading(true);
    const response = await API.getNowPlaying();
    if (!response) return;
    setTrack(response);
    addSample(response.sample);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const contextValues = {
    track,
    loading,
    refresh,
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