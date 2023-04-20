import { Trophy } from 'pages/Playstation/service/types';

import { Sorting } from './providers/sort-provider';

export function sortTrophies(trophies: Trophy[], sorting: Sorting): Trophy[] {
  const typeValues = {
    platinum: 0,
    gold: 1,
    silver: 2,
    bronze: 3,
  };

  const compareId = (a: Trophy, b: Trophy) => {
    return a.id - b.id;
  };
  const compareEarnedTime = (a: Trophy, b: Trophy) => {
    if (!a.isEarned && !b.isEarned) return undefined;
    if (!a.isEarned) return 1;
    if (!b.isEarned) return -1;
    return compare(a.earnedAt, b.earnedAt);
  };
  const compareRarity = (a: Trophy, b: Trophy) => {
    if (!a?.rarity) return -1;
    if (!b?.rarity) return 1;
    return parseFloat(a.rarity) - parseFloat(b.rarity);
  };
  const compareGrade = (a: Trophy, b: Trophy) => {
    return typeValues[a.type] - typeValues[b.type];
  };

  const sorted = trophies.sort((a, b) => {
    // negative if a should be before b
    switch (sorting.type) {
      case 'Default':
        return compareId(a, b);

      case 'Earned Time':
        const diff = compareEarnedTime(a, b);
        if (diff === undefined) return -compareRarity(a, b);
        if (diff === 0) return compareGrade(a, b);
        return diff;

      case 'Rarity':
        const rarityDiff = compareRarity(a, b);
        if (rarityDiff !== 0) return rarityDiff;
        return compareGrade(a, b);

      case 'Grade':
        const gradeDiff = compareGrade(a, b);
        if (gradeDiff !== 0) return gradeDiff;
        return compareId(a, b);

      default:
        return 0;
    }
  });
  if (sorting.order === 'desc') return sorted.reverse();
  return sorted;
}

/**
 * undefined is considered earlier than all defined dates.
 *
 * @returns
 * - negative if A is before B,
 * - positive if B is before A,
 * - 0 if equal
 * - undefined if both are undefined
 */
export function compare(
  a: Date | string | undefined,
  b: Date | string | undefined,
): number | undefined {
  if (!a && !b) return undefined;
  if (!a) return -1;
  if (!b) return 1;
  const aTime = new Date(a).getTime();
  const bTime = new Date(b).getTime();
  return aTime - bTime;
}
