export type TypeTrack = {
  title: string,
  artists: string[],
  art: string,
  isExplicit: boolean,
  isLocal: boolean,
  href: string,
  sample: string,
}

export type TypeNowPlaying = TypeTrack & {
  length: number,
  progress: number,
}

export type TypeArtist = {
  name: string,
  genres: string[],
  image: string,
  href: string,
}