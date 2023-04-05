import React, { useState } from 'react';

const MusicPlayerContext = React.createContext<
  | {
    currentSong: HTMLAudioElement | undefined;
    handlePlayPause: (sample: string) => void;
    addSample: (sample: string) => void;
    isPlaying: (sample: string) => boolean;
  }
  | undefined
>(undefined);

type props = { children: JSX.Element };
export function MusicPlayerProvider({ ...props }: props) {
  const [currentSong, setCurrentSong] = useState<HTMLAudioElement | undefined>(undefined);
  const [samples, setSamples] = useState<Map<string, HTMLAudioElement>>(new Map());

  const handlePlayPause = (sample: string) => {
    if (!currentSong) {
      const newSong = samples.get(sample);
      if (!newSong) return;
      newSong.play();
      setCurrentSong(newSong);
      return;
    }
    if (currentSong.src !== sample) {
      currentSong.pause();
      const newSong = samples.get(sample);
      if (!newSong) return;
      newSong.play();
      setCurrentSong(newSong);
      return;
    }
    currentSong.pause();
    setCurrentSong(undefined);
  };

  const addSample = (sample: string | undefined) => {
    if (!sample) return;
    const newSample = new Audio(sample);
    newSample.volume = 0.1;
    newSample.onended = () => {
      newSample.currentTime = 0;
      setCurrentSong(undefined);
    };
    setSamples(prev => {
      prev.set(sample, newSample);
      return prev;
    });
  };

  const isPlaying = (sample: string) => {
    if (!currentSong) return false;
    return currentSong.src === sample && !currentSong.paused;
  };

  const contextValues = {
    currentSong,
    handlePlayPause,
    addSample,
    isPlaying,
  };

  return (
    <MusicPlayerContext.Provider value={contextValues} >
      {props.children}
    </MusicPlayerContext.Provider >
  );
}

export function useMusicPlayer() {
  const context = React.useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return { ...context };
}