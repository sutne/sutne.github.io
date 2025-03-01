import { useEffect, useState } from 'react';
import { ItemCard, ItemCardShimmer } from '../components/item-card';
import { ItemRow } from '../components/item-row';
import { SectionTitle } from '../components/typography';
import * as API from '../service/api';
import type { ArtistType } from '../service/types';

export function TopArtists() {
  const [artists, setArtists] = useState<ArtistType[] | undefined>(undefined);
  const isLoading = !artists;

  useEffect(() => {
    const getTracks = async () => {
      const response = await API.getTopArtists();
      setArtists(response);
    };
    getTracks();
  }, []);

  return (
    <>
      <SectionTitle title='Top Artists' />
      <ItemRow>
        {isLoading
          ? Array(15)
              .fill(null)
              .map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: no other value to use
                <ItemCardShimmer key={i} />
              ))
          : artists.map((artist) => (
              <ItemCard
                key={artist.href}
                image={artist.image}
                title={artist.name}
                subtitle={artist.genres.join(', ')}
                href={artist.href}
              />
            ))}
      </ItemRow>
    </>
  );
}
