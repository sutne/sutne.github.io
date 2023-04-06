import React, { useEffect, useState } from 'react';

import { ItemCard } from '../components/item-card';
import { ItemRow } from '../components/item-row';
import { SectionTitle } from '../components/typography';
import { useMusicPlayer } from '../providers/music-player';
import { useNowPlaying } from '../providers/now-playing-provider';
import * as API from '../service/api';
import { TrackType } from '../service/types';

export function RecentlyPlayed(): JSX.Element {

  const [tracks, setTracks] = useState<TrackType[]>([]);

  const { addSample } = useMusicPlayer();
  const { track } = useNowPlaying();

  useEffect(() => {
    const getTracks = async () => {
      const response = await API.getRecentlyPlayed();
      setTracks(response);
      for (const track of response) {
        addSample(track.sample);
      }
    };
    getTracks();
  }, [track]); // Refresh when the current track changes

  if (!tracks) return <></>;
  return <>
    <SectionTitle title='Recently Played' />
    <ItemRow>
      {tracks.map((track: TrackType, i: number) => {
        return <ItemCard key={i}
          image={track.image}
          sample={track.sample}
          title={track.title}
          subtitle={track.artists.join(', ')}
        />;
      })}
    </ItemRow>
  </>;
}