import React, { useEffect, useState } from 'react';

import { ItemCard } from '../components/item-card';
import { ItemRow } from '../components/item-row';
import { SectionTitle } from '../components/typography';
import { useMusicPlayer } from '../providers/music-player';
import * as API from '../service/api';
import { TrackType } from '../service/types';

export function TopTracks(): JSX.Element {
  const [tracks, setTracks] = useState<TrackType[]>([]);

  const { addSample } = useMusicPlayer();

  useEffect(() => {
    const getTracks = async () => {
      const response = await API.getTopTracks();
      setTracks(response);
      for (const track of response) {
        addSample(track.sample);
      }
    };
    getTracks();
  }, []);

  if (!tracks) return <></>;
  return (
    <>
      <SectionTitle title='Top Tracks' />
      <ItemRow>
        {tracks.map((track: TrackType, i: number) => {
          return (
            <ItemCard
              key={i}
              image={track.image}
              sample={track.sample}
              title={track.title}
              subtitle={track.artists.join(', ')}
            />
          );
        })}
      </ItemRow>
    </>
  );
}
