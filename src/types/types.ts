export type Episode = {
  episode_id: number,
  title: string,
  season: number,
  episode: number,
  air_date: string,
  characters: string[]
}

export type Season = Episode[];

export type Seasons = {
  [key: string]: Season
}