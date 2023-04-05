import React from 'react';

import { ArtistType } from '../service/types';
import { ItemCard } from './item-card';

type props = {
  artist: ArtistType,
}
export function Artist({ ...props }: props) {
  return <ItemCard
    imageUrl={props.artist.image}
    title={props.artist.name}
    subtitle={props.artist.genres.join(', ')}
  />;
}