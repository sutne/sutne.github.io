import { GameType } from './types';

export async function getRecentGames(): Promise<GameType[]> {
  const response = await fetch(
    'https://personal-sutne.vercel.app/api/playstation/recently-played',
  );
  const data = await response.json();
  return data;
}
