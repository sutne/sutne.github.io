import { useEffect, useState } from 'react';
import { ItemCard, ItemCardShimmer } from '../components/item-card';
import { ItemRow } from '../components/item-row';
import { SectionTitle } from '../components/typography';
import { useMusicPlayer } from '../providers/music-player';
import { useNowPlaying } from '../providers/now-playing-provider';
import * as API from '../service/api';
import type { TrackType } from '../service/types';

export function RecentlyPlayed() {
  const [tracks, setTracks] = useState<TrackType[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const { addSample } = useMusicPlayer();
  const { track } = useNowPlaying();

  useEffect(() => {
    const getTracks = async () => {
      setIsLoading(true);
      const response = await API.getRecentlyPlayed();
      setTracks(response);
      for (const track of response) {
        if (track?.sample) addSample(track.sample);
      }
      setIsLoading(false);
    };
    getTracks();
  }, [track]); // Refresh when the current track changes

  return (
    <>
      <SectionTitle title='Recently Played' />
      <ItemRow>
        {isLoading ? (
          Array(15)
            .fill(null)
            .map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: no other value to use
              <ItemCardShimmer key={i} />
            ))
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
