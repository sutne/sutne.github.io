import {
  Platform,
  PlatformInfo,
  Profile,
  RecentGame,
  TrophyGame,
  TrophyGroup,
} from './types';

const BASE_URL = 'https://personal-sutne.vercel.app/api/playstation';

export async function getProfile(): Promise<Profile | undefined> {
  const response = await fetch(`${BASE_URL}/profile`);
  if (!response.ok) return undefined;
  const data = await response.json();
  return data;
}

export async function getRecentGames(): Promise<RecentGame[]> {
  const response = await fetch(`${BASE_URL}/recently-played`);
  if (!response.ok) return [];
  const data = await response.json();
  return data;
}

export async function getGameList(): Promise<TrophyGame[]> {
  const response = await fetch(`${BASE_URL}/trophies`);
  if (!response.ok) return [];
  const data = await response.json();
  return data;
}

export async function getTrophyGroups(
  gameIds: string[],
  platforms: Platform[],
): Promise<TrophyGroup[]> {
  const platformInfo: PlatformInfo[] = gameIds.map((id, i) => ({
    id: id,
    platform: platforms[i],
  }));
  const query = platformInfo
    .map((info) => `id=${info.id}&platform=${info.platform}`)
    .join('&');
  const response = await fetch(`${BASE_URL}/trophies?${query}`);
  if (!response.ok) return [];
  const data = await response.json();
  return data;
}
