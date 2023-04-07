import { ArtistType, NowPlayingType, TrackType as TrackType } from './types';

const API_URL = 'https://personal-sutne.vercel.app/api/spotify';

export async function getNowPlaying(): Promise<NowPlayingType | undefined> {
  const result = await fetch(`${API_URL}/now-playing`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  return result;
}

export async function getRecentlyPlayed(): Promise<TrackType[]> {
  const result = await fetch(`${API_URL}/recently-played`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  return result;
}

export async function getTopTracks(): Promise<TrackType[]> {
  const result = await fetch(`${API_URL}/top-tracks`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  return result;
}

export async function getTopArtists(): Promise<ArtistType[]> {
  const result = await fetch(`${API_URL}/top-artists`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  return result;
}
