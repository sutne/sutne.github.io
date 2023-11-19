import { Trophy, TrophyGame } from 'pages/Playstation/service/types';
import { Sorting } from 'providers/sort-provider';

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
    const hideA = a.isHidden && !a.isEarned;
    const hideB = b.isHidden && !b.isEarned;
    if (hideA && hideB) return 0;
    if (hideA) return 1;
    if (hideB) return -1;
    return typeValues[a.type] - typeValues[b.type];
  };

  const sorted = trophies.sort((a, b) => {
    // negative if a should be before b
    let diff = undefined;
    switch (sorting.type) {
      case 'Earned Time':
        diff = compareEarnedTime(a, b);
        if (diff === undefined) diff = -compareRarity(a, b);
        if (diff === 0) diff = compareGrade(a, b);
        break;

      case 'Rarity':
        diff = compareRarity(a, b);
        if (diff === 0) diff = compareGrade(a, b);
        break;

      case 'Grade':
        diff = compareGrade(a, b);
        if (diff === 0) diff = compareId(a, b);
        break;

      case 'Default':
        diff = compareId(a, b);
        break;

      default:
        diff = 0;
        break;
    }
    diff = diff ?? 0;
    return sorting.order === 'desc' ? -diff : diff;
  });
  return sorted;
}

export function sortGames(games: TrophyGame[], sorting: Sorting): TrophyGame[] {
  const compareLastTrophy = (a: TrophyGame, b: TrophyGame) => {
    if (!a.lastTrophyEarnedAt && !b.lastTrophyEarnedAt) return undefined;
    if (!a.lastTrophyEarnedAt) return -1;
    if (!b.lastTrophyEarnedAt) return 1;
    return compare(b.lastTrophyEarnedAt, a.lastTrophyEarnedAt);
  };
  const compareFirstTrophy = (a: TrophyGame, b: TrophyGame) => {
    if (!a.firstTrophyEarnedAt && !b.firstTrophyEarnedAt) return undefined;
    if (!a.firstTrophyEarnedAt) return -1;
    if (!b.firstTrophyEarnedAt) return 1;
    return compare(a.firstTrophyEarnedAt, b.firstTrophyEarnedAt);
  };
  const compareProgress = (a: TrophyGame, b: TrophyGame) => {
    return b.progress - a.progress;
  };

  const sorted = games.sort((a, b) => {
    // negative if a should be before b
    let diff = undefined;
    switch (sorting.type) {
      case 'Latest Trophy':
        diff = compareLastTrophy(a, b);
        break;

      case 'First Trophy':
        diff = compareFirstTrophy(a, b);
        if (!diff) diff = compareLastTrophy(b, a);
        break;

      case 'Progress':
        diff = compareProgress(a, b);
        if (diff === 0) diff = compareLastTrophy(a, b);
        break;

      default:
        diff = 0;
        break;
    }
    diff = diff ?? 0;
    return sorting.order === 'desc' ? -diff : diff;
  });
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
  const diff = aTime - bTime;
  return diff != 0 ? diff : undefined;
}
