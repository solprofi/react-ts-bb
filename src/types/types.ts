export type Episode = {
  episode_id: number
  title: string
  season: number
  episode: number
  air_date: string
  characters: string[]
}

export type Season = Episode[];

export type Seasons = {
  [key: string]: Season
}

export type Character = {
    char_id: number
    name: string
    birthday: string
    occupation: string[]
    img: string
    status: string
    appearance: number[]
    nickname: string
    portrayed: string
    better_call_saul_appearance: number[]
}