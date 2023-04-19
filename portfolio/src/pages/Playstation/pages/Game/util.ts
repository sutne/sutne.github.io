import { Trophy } from 'pages/Playstation/service/types';

import { Sorting } from './providers/sort-provider';

export function sortTrophies(trophies: Trophy[], sorting: Sorting): Trophy[] {
  const typeValues = {
    hidden: 0,
    bronze: 1,
    silver: 2,
    gold: 3,
    platinum: 4,
  };

  const sorted = trophies.sort((a, b) => {
    // negative if a should be before b
    switch (sorting.type) {
      case 'Default':
        return 0;
      // return a.id.localeCompare(b.id);
      case 'Earned Time':
        if (!a.isEarned) return 1;
        if (!b.isEarned) return -1;
        const diff = compare(a.earnedAt, b.earnedAt);
        if (diff === 0) {
          return typeValues[a.type] - typeValues[b.type];
        } else {
          return diff;
        }
      case 'Rarity':
        if (!a?.rarity) return -1;
        if (!b?.rarity) return 1;
        return b.rarity - a.rarity;
      case 'Grade':
        return typeValues[a.type] - typeValues[b.type];
      default:
        return 0;
    }
  });
  if (sorting.order === 'desc') return sorted.reverse();
  return sorted;
}

/**
 * undefined is considered after all defined dates.
 *
 * @returns positive if A is before B, negative if B is before A, 0 if equal
 */
export function compare(
  a: Date | string | undefined,
  b: Date | string | undefined,
): number {
  if (!a) return -1;
  if (!b) return 1;
  const aTime = new Date(a).getTime();
  const bTime = new Date(b).getTime();
  return bTime - aTime;
}
