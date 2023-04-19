import React from 'react';

import { TrophyProgressCard } from '../../../components/trophy-progress-card';
import { TrophyGroup } from '../../../service/types';
import { TrophyList } from './trophy-list';

export function Group(props: { group: TrophyGroup }) {
  return (
    <>
      <TrophyProgressCard
        image={props.group.icon}
        title={props.group.name}
        progress={props.group.progress}
        trophyCount={props.group.trophyCount}
        earnedCount={props.group.earnedCount}
      >
        <TrophyList list={props.group.trophies} />
      </TrophyProgressCard>
    </>
  );
}
