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
  const [currentSample, setCurrentSample] = useState<
    HTMLAudioElement | undefined
  >();
  const [samples, setSamples] = useState<Map<string, HTMLAudioElement>>(
    new Map(),
  );

  const handlePlayPause = (sample: string) => {
    if (!currentSample) {
      const newSample = samples.get(sample);
      if (!newSample) return;
      newSample.play();
      newSample.volume = 0.1;
      setCurrentSample(newSample);
      return;
    }
    if (currentSample.src !== sample) {
      currentSample.pause();
      const newSample = samples.get(sample);
      if (!newSample) return;
      newSample.play();
      newSample.volume = 0.1;
      setCurrentSample(newSample);
      return;
    }
    currentSample.pause();
    setCurrentSample(undefined);
  };

  const addSample = (sample: string | undefined) => {
    if (!sample) return;
    const newSample = new Audio(sample);
    newSample.volume = 0.1;
    newSample.onended = () => {
      newSample.currentTime = 0;
      setCurrentSample(undefined);
    };
    setSamples((prev) => {
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

  React.useEffect(() => {
    return () => {
      if (!currentSample) return;
      console.log('unmounting');
      currentSample.pause();
      setCurrentSample(undefined);
    };
  }, []);

  return (
    <MusicPlayerContext.Provider value={contextValues}>
      {props.children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = React.useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return { ...context };
}
