import type { TrophyCount, TrophyType } from '../service/types';

const TrophyPoints = {
  bronze: 15,
  silver: 30,
  gold: 90,
  platinum: 300,
} as const;

export function emptyTrophyCount(): TrophyCount {
  return {
    bronze: 0,
    silver: 0,
    gold: 0,
    platinum: 0,
  };
}

export function mergeTrophyCounts(a: TrophyCount, b: TrophyCount): TrophyCount {
  return {
    bronze: a.bronze + b.bronze,
    silver: a.silver + b.silver,
    gold: a.gold + b.gold,
    platinum: a.platinum + b.platinum,
  };
}

export function getTrophyPoints(counts: TrophyCount): number {
  return Object.entries(counts).reduce((sum, trophy) => {
    const [type, count] = trophy;
    return sum + TrophyPoints[type as TrophyType] * count;
  }, 0);
}

export function getTrophyCountProgress(
  earned: TrophyCount,
  defined: TrophyCount,
): number {
  const earnedPoints = getTrophyPoints({ ...earned, platinum: 0 });
  const availablePoints = getTrophyPoints({ ...defined, platinum: 0 });
  const percentage = (100 * earnedPoints) / availablePoints;
  return Math.round(percentage);
}
