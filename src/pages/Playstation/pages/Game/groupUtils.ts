import type {
  Trophy,
  TrophyCount,
  TrophyGroup,
  TrophyType,
} from '../../service/types';

export const earnedTrophyGroupTitle = 'Earned Trophies';
export const unearnedTrophyGroupTitle = 'Unearned Trophies';
/** Return 1 TrophyGroup for earned trophies, and 1 group for unearned trophies */
export function groupByEarned(trophies: Trophy[]): TrophyGroup[] {
  const earnedTrophies = trophies.filter((trophy) => trophy.isEarned);
  const unearnedTrophies = trophies.filter((trophy) => !trophy.isEarned);

  const earnedCount: TrophyCount = earnedTrophies.reduce(
    (counts, trophy) => {
      counts[trophy.type]++;
      return counts;
    },
    { bronze: 0, silver: 0, gold: 0, platinum: 0 },
  );
  const unearnedCount: TrophyCount = unearnedTrophies.reduce(
    (counts, trophy) => {
      counts[trophy.type]++;
      return counts;
    },
    { bronze: 0, silver: 0, gold: 0, platinum: 0 },
  );

  const earned: TrophyGroup = {
    id: 0,
    name: earnedTrophyGroupTitle,
    icon: new URL('../../assets/trophies/gold.png', import.meta.url).href,
    trophyCount: earnedCount,
    earnedCount: earnedCount,
    progress: -1,
    trophies: earnedTrophies,
  };
  const unearned: TrophyGroup = {
    id: 1,
    name: unearnedTrophyGroupTitle,
    icon: new URL('../../assets/trophies/hidden.png', import.meta.url).href,
    trophyCount: unearnedCount,
    earnedCount: unearnedCount,
    progress: -1,
    trophies: unearnedTrophies,
  };
  return [earned, unearned].filter((group) => group.trophies.length > 0);
}

/** Return 1 TrophyGroup for each trophy type */
export function groupByType(trophies: Trophy[]): TrophyGroup[] {
  const types = ['hidden', 'bronze', 'silver', 'gold', 'platinum'] as const;
  const trophyGroups: TrophyGroup[] = types.map((type, i) => ({
    id: i,
    name: type.charAt(0).toUpperCase() + type.slice(1),
    icon: new URL(`../../assets/trophies/${type}.png`, import.meta.url).href,
    trophyCount: { bronze: 0, silver: 0, gold: 0, platinum: 0 },
    earnedCount: { bronze: 0, silver: 0, gold: 0, platinum: 0 },
    progress: -1,
    trophies: [],
  }));

  for (const trophy of trophies) {
    const group =
      trophy.isHidden && !trophy.isEarned
        ? trophyGroups.find((group) => group.name === 'Hidden')
        : trophyGroups.find(
            (group) => group.name.toLowerCase() === trophy.type,
          );
    if (!group) continue;
    group.trophies.push(trophy);
    group.trophyCount[trophy.type]++;
    if (trophy.isEarned) group.earnedCount[trophy.type]++;
  }

  for (const group of trophyGroups) {
    if (group.name === 'Hidden') {
      group.trophyCount = { bronze: 0, silver: 0, gold: 0, platinum: 0 };
      group.earnedCount = { bronze: 0, silver: 0, gold: 0, platinum: 0 };
      continue;
    }
    const type = group.name.toLowerCase() as TrophyType;
    group.progress = Math.round(
      (100 * group.earnedCount[type]) / group.trophyCount[type],
    );
    group.trophyCount[type] = 0;
  }

  return trophyGroups.filter((group) => group.trophies.length > 0);
}
