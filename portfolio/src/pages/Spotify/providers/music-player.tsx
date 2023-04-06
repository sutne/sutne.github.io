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
  const [currentSample, setCurrentSong] = useState<HTMLAudioElement | undefined>(undefined);
  const [samples, setSamples] = useState<Map<string, HTMLAudioElement>>(new Map());

  const handlePlayPause = (sample: string) => {
    if (!currentSample) {
      const newSample = samples.get(sample);
      if (!newSample) return;
      newSample.play();
      newSample.volume = 0.1;
      setCurrentSong(newSample);
      return;
    }
    if (currentSample.src !== sample) {
      currentSample.pause();
      const newSample = samples.get(sample);
      if (!newSample) return;
      newSample.play();
      newSample.volume = 0.1;
      setCurrentSong(newSample);
      return;
    }
    currentSample.pause();
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
    if (!currentSample) return false;
    return currentSample.src === sample && !currentSample.paused;
  };

  const contextValues = {
    currentSong: currentSample,
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