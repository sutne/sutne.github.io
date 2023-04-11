import { GameType, ProfileType } from './types';

const BASE_URL = 'https://personal-sutne.vercel.app/api/playstation';

export async function getRecentGames(): Promise<GameType[]> {
  const response = await fetch(`${BASE_URL}/recently-played`);
  const data = await response.json();
  return data;
}

export async function getProfile(): Promise<ProfileType> {
  const response = await fetch(`${BASE_URL}/profile`);
  const data = await response.json();
  return data;
}
