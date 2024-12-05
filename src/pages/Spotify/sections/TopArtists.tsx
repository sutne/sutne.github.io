import { useEffect, useState } from 'react';
import { ItemCard } from '../components/item-card';
import { ItemRow } from '../components/item-row';
import { SectionTitle } from '../components/typography';
import * as API from '../service/api';
import type { ArtistType } from '../service/types';

export function TopArtists() {
  const unloaded = new Array<ArtistType>(15).fill({
    name: '',
    genres: [] as string[],
    image: '',
    href: '',
  });
  const [artists, setArtists] = useState<ArtistType[]>([]);

  useEffect(() => {
    const getTracks = async () => {
      setArtists(unloaded);
      const response = await API.getTopArtists();
      setArtists(response);
    };
    getTracks();
  }, []);

  return (
    <>
      <SectionTitle title='Top Artists' />
      <ItemRow>
        {artists.map((artist, i) => (
          <ItemCard
            // biome-ignore lint/suspicious/noArrayIndexKey: required to replace "shimmer"/empty ones
            key={i}
            image={artist.image}
            title={artist.name}
            subtitle={artist.genres.join(', ')}
          />
        ))}
      </ItemRow>
    </>
  );
}
