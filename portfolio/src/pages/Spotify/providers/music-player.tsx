import React from 'react';

const MusicPlayerContext = React.createContext<
  | {
      currentSample: HTMLAudioElement | undefined;
      handlePlayPause: (sample: string) => void;
      addSample: (sample: string) => void;
      isPlaying: (sample: string) => boolean;
    }
  | undefined
>(undefined);

export function MusicPlayerProvider(props: { children: JSX.Element }) {
  const [currentSample, setCurrentSample] = React.useState<HTMLAudioElement>();
  const [samples, setSamples] = React.useState<Map<string, HTMLAudioElement>>(
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

  React.useEffect(() => {
    return () => {
      if (!currentSample) return;
      currentSample.pause();
      setCurrentSample(undefined);
    };
  }, []);

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSample,
        handlePlayPause,
        addSample,
        isPlaying,
      }}
    >
      {props.children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = React.useContext(MusicPlayerContext);
  if (context !== undefined) return { ...context };
  throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
}
