import { TypeArtist, TypeNowPlaying, TypeTrack as TypeTrack } from "./types";

const API_URL = "https://personal-sutne.vercel.app/api/spotify";

export async function getNowPlaying(): Promise<TypeNowPlaying | undefined> {
  const result = await fetch(`${API_URL}/now-playing`)
    .then(res => res.json())
    .catch(err => console.error(err))
  return result;
}

export async function getRecentlyPlayed(): Promise<TypeTrack[]> {
  const result = await fetch(`${API_URL}/recently-played`)
    .then(res => res.json())
    .catch(err => console.error(err))
  return result;
}

export async function getTopTracks(): Promise<TypeTrack[]> {
  const result = await fetch(`${API_URL}/top-tracks`)
    .then(res => res.json())
    .catch(err => console.error(err))
  return result;
}

export async function getTopArtists(): Promise<TypeArtist[]> {
  const result = await fetch(`${API_URL}/top-artists`)
    .then(res => res.json())
    .catch(err => console.error(err))
  return result;
}