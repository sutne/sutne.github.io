import React from 'react';

import { TrackType } from '../service/types';
import { ItemCard } from './item-card';

type props = {
  track: TrackType,
}
export function Track({ ...props }: props) {
  return <ItemCard
    imageUrl={props.track.art}
    trackSample={props.track.sample}
    title={props.track.title}
    subtitle={props.track.artists.join(', ')}
  />;
}