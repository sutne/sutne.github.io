import { Profile, RecentGame, TrophyGame, TrophyGroup } from './types';

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

// export async function getTrophies(): Promise<TrophyGame[]> {
//   const response = await fetch(`${BASE_URL}/trophies`);
//   const data = await response.json();
//   return data;
// }

export async function getTrophyGroups(
  gameId: string,
  platform: string,
): Promise<TrophyGroup[]> {
  const response = await fetch(
    `${BASE_URL}/trophies?game=${gameId}&platform=${platform}`,
  );
  if (!response.ok) return [];
  const data = await response.json();
  return data;
}
