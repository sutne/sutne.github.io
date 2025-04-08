import { useEffect, useState } from 'react';
import { ItemCard, ItemCardShimmer } from '../components/item-card';
import { ItemRow } from '../components/item-row';
import { SectionTitle } from '../components/typography';
import { useMusicPlayer } from '../providers/music-player';
import * as API from '../service/api';
import type { TrackType } from '../service/types';

export function TopTracks() {
  const [tracks, setTracks] = useState<TrackType[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const { addSample } = useMusicPlayer();

  useEffect(() => {
    const getTracks = async () => {
      setIsLoading(true);
      const response = await API.getTopTracks();
      setTracks(response);
      for (const track of response) {
        if (track?.sample) addSample(track.sample);
      }
      setIsLoading(false);
    };
    getTracks();
  }, []);

  return (
    <>
      <SectionTitle title='Top Tracks' />
      <ItemRow>
        {isLoading ? (
          Array(15)
            .fill(null)
            .map((_, i) => `item-card-shimmer-${i}`)
            .map((key) => <ItemCardShimmer key={key} />)
        ) : !tracks ? (
          <></>
        ) : (
          tracks.map((track) => (
            <ItemCard
              key={track.href}
              image={track.image}
              title={track.title}
              subtitle={track.artists.join(', ')}
              href={track.href}
              sample={track.sample}
            />
          ))
        )}
      </ItemRow>
    </>
  );
}
