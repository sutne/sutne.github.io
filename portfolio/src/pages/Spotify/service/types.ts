export type TrackType = {
  title: string,
  artists: string[],
  art: string,
  isExplicit: boolean,
  isLocal: boolean,
  href: string,
  sample: string,
}

export type NowPlayingType = TrackType & {
  length: number,
  progress: number,
}

export type ArtistType = {
  name: string,
  genres: string[],
  image: string,
  href: string,
}