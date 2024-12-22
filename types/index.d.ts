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