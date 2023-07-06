import React from 'react';
import { CircularProgress } from '@mui/material';

import { ItemCard } from '../components/item-card';
import { ItemRow } from '../components/item-row';
import { SectionTitle } from '../components/typography';
import * as API from '../service/api';
import { ArtistType } from '../service/types';

export function TopArtists() {
  const [artists, setArtists] = React.useState<ArtistType[]>([]);

  React.useEffect(() => {
    const getTracks = async () => {
      const response = await API.getTopArtists();
      setArtists(response);
    };
    getTracks();
  }, []);

  if (!artists.length) return <CircularProgress />;
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
