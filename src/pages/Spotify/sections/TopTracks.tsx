import React from 'react';

import { ItemCard } from '../components/item-card';
import { ItemRow } from '../components/item-row';
import { SectionTitle } from '../components/typography';
import { useMusicPlayer } from '../providers/music-player';
import * as API from '../service/api';
import { TrackType } from '../service/types';

export function TopTracks() {
  const unloaded = new Array<TrackType>(15).fill({
    title: '',
    artists: [] as string[],
    image: '',
    sample: '',
    href: '',
    isExplicit: false,
    isLocal: false,
  });
  const [tracks, setTracks] = React.useState<TrackType[]>([]);

  const { addSample } = useMusicPlayer();

  React.useEffect(() => {
    const getTracks = async () => {
      setTracks(unloaded);
      const response = await API.getTopTracks();
      setTracks(response);
      for (const track of response) {
        addSample(track.sample);
      }
    };
    getTracks();
  }, []);

  return (
    <>
      <SectionTitle title='Top Tracks' />
      <ItemRow>
        {tracks.map((track, i) => (
          <ItemCard
            key={i}
            image={track.image}
            sample={track.sample}
            title={track.title}
            subtitle={track.artists.join(', ')}
          />
        ))}
      </ItemRow>
    </>
  );
}
