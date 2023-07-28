import React from 'react';

import { ItemCard } from '../components/item-card';
import { ItemRow } from '../components/item-row';
import { SectionTitle } from '../components/typography';
import * as API from '../service/api';
import { ArtistType } from '../service/types';

export function TopArtists() {
  const unloaded = new Array<ArtistType>(12).fill({
    name: '',
    genres: [] as string[],
    image: '',
    href: '',
  });
  const [artists, setArtists] = React.useState<ArtistType[]>([]);

  React.useEffect(() => {
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
        {artists.map((artist: ArtistType, i: number) => {
          return (
            <ItemCard
              key={i}
              image={artist.image}
              title={artist.name}
              subtitle={artist.genres.join(', ')}
            />
          );
        })}
      </ItemRow>
    </>
  );
}
