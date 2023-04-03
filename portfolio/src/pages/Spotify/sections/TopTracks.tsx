import React, { useEffect, useState } from 'react';

import { ItemRow } from '../components/item-row';
import { Track } from '../components/track';
import { SectionTitle } from '../components/typography';
import { useMusicPlayer } from '../providers/music-player';
import * as API from '../service/api';
import { TypeTrack } from '../service/types';

export function TopTracks(): JSX.Element {
  const [tracks, setTracks] = useState<TypeTrack[]>([]);
  const { addSample } = useMusicPlayer();

  useEffect(() => {
    const getTracks = async () => {
      const response = await API.getTopTracks();
      setTracks(response);
      for (const track of response) {
        addSample(track.sample)
      }
    }
    getTracks();
  }, [])

  if (!tracks) return <></>
  return <>
    <SectionTitle title="Top Tracks" />
    <ItemRow>
      {tracks.map((track: TypeTrack, i: number) => {
        return <Track key={i} track={track}
        />
      })}
    </ItemRow>
  </>
}