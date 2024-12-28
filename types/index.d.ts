declare type MediaItem = {
  backdrop_path: string
  id: number
  title?: string
  original_title?: string
  name?:string
  original_name?: string
  overview: string
  poster_path: string
  media_type: "movie" | "tv" | "person"
  adult: boolean
  original_language: string
  genre_ids: number[]
  popularity: number
  release_date?: string
  first_air_date?: string
  video: boolean
  vote_average: number
  vote_count: number
}

declare type MediaListProps = {
  items: MediaItem[] | []
  direction?: "row" | "column"
}

declare type MediaCardProps = {
  item: MediaItem
  direction?: "row" | "column"
}

declare type Genre = {
  id: number,
  name: string
}
declare type Movie = {
  adult: boolean,
  backdrop_path: string,
  belongs_to_collection: string,
  budget: number,
  genres: Genre[],
  homepage: string,
  id: number,
  imdb_id: string,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number
  poster_path: string
  release_date: string,
  revenue: number,
  runtime: number,
  status: string,
  tagline: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}

declare type Person = {
  adult: boolean,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string,
  cast_id: number,
  character: string,
  credit_id: string,
  order: number,
  department: string,
  job: string
}

declare type PersonListProps = {
  cast: Person[],
}

declare type PersonCardProps = {
  person: Person
}

declare type Video = {
  iso_639_1: string,
  iso_3166_1: string,
  name: string,
  key: string,
  site: string
  size: number,
  type: string,
  official: boolean,
  published_at: string
  id: string
}

declare type Image = {
  aspect_ratio: number,
  height: number,
  iso_639_1: string,
  file_path: string,
  vote_average: number,
  vote_count: number,
  width: number
}