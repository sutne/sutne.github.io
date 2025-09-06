import { useParams } from 'react-router-dom';
import { useTrophies } from '../../../contexts/Trophies';
import type { CompleteTrophy, Platform } from '../../../service/types';
import { compareEarnedTime } from '../../../util/sorting';

export type GameVersion = {
  id: string;
  platform: Platform;
};
export type TrophyUrl = {
  trophyId: number;
  versions: GameVersion[];
};
function useTrophyUrl() {
  const params = useParams();
  const gameIds = params.gameIds ? params.gameIds.split(',') : undefined;
  const platforms = params.platforms ? params.platforms.split(',') : undefined;
  const trophyId = params.trophyId ? Number(params.trophyId) : undefined;
  if (!gameIds || !platforms || trophyId === undefined) {
    throw new Error(
      `useTrophyUrl was unused on unexpected URL: ${window.location.href}`,
    );
  }
  const versions = gameIds.map((gameId, i) => ({
    id: gameId,
    platform: platforms[i] as Platform,
  }));
  return {
    trophyId,
    versions,
  };
}

export function useTrophiesFromUrl(): CompleteTrophy[] {
  const { isLoading, getTrophy } = useTrophies();
  const trophyUrl = useTrophyUrl();
  if (isLoading) return [];
  const trophies = trophyUrl.versions
    .map((version) => getTrophy(version.id, trophyUrl.trophyId))
    .filter((trophy) => trophy !== undefined)
    .sort((a, b) => compareEarnedTime(a, b) ?? 0);
  if (!trophies.length) {
    throw new Error(`No trophies matches this url: ${window.location.href}`);
  }
  return trophies;
}
