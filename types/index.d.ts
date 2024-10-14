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