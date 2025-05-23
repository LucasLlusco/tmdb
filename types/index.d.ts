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

declare type TvShow = {
  adult: boolean,
  backdrop_path: string,
  created_by: [{
    id: number,
    credit_id: string,
    name: string,
    gender: number,
    profile_path: string
  }],
  episode_run_time: number[],
  first_air_date: string,
  genres: Genre[],
  homepage: string,
  id: number,
  in_production: boolean,
  languages: string[]
  last_air_date: string,
  last_episode_to_air: [{
    id: number,
    name: string,
    overview: string
    vote_average: number,
    vote_count: number,
    air_date: string,
    episode_number: number,
    production_code: string,
    runtime: number,
    season_number: number,
    show_id: number,
    still_path: string
  }],
  name: string,
  next_episode_to_air: string,
  networks: [{
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
  }],
  number_of_episodes: number,
  number_of_seasons: number,
  origin_country: string[],
  original_language: string,
  original_name: string,
  overview: string,
  popularity: number,
  poster_path: string,
  //production_companies
  //production_countries
  seasons: TvShowSeason[],
  spoken_languages: [{
    english_name: string,
    iso_639_1: string,
    name: string
  }],
  status: string,
  tagline: string,
  type: string,
  vote_average: number
  vote_count: number
}

declare type TvShowSeason = {
  _id: string,
  air_date: string,
  episode_count: number,
  episodes: TvShowSeasonEpisode[],
  id: number,
  name: string,
  overview: string,
  poster_path: string,
  season_number: number,
  vote_average: number
}

declare type TvShowSeasonEpisode = {
  air_date: string,
  episode_number: number,
  id: number,
  name: string,
  overview: string,
  production_code: string,
  runtime: number,
  season_number: number,
  show_id: number,
  still_path: string,
  vote_average: number,
  vote_count: number,
  crew: [],
  guest_stars: []
}

declare type Region = {
  iso_3166_1: string,
  english_name: string,
  native_name: string
}

declare type Provider = {
  display_priorities: object
  display_priority: number,
  logo_path: string,
  provider_name: string,
  provider_id: number
}

declare type Genre = {
  id: number,
  name: string
}

declare type DiscoverFiltersType = {
  selectedSort: string,
  selectedRegion: string,
  selectedProviders: string[],
  selectedGenres: string[],
  page: number,
  filtersHasChanged: boolean
  showLoadMoreBtn: boolean
}

declare type UserType = {
  $id: string,
  $databaseId: string,
  $collectionId: string,
  $createdAt: string,
  $updatedAt: string,
  $permissions: [],
  username: string,
  email: string,
  userId: string,
  avatarId?: string, 
  avatarPath?: string, 
  bio?:string 
}

declare type NewUserDataType = {
  username?: string,
  email?: string,
  avatarId?: string,
  avatarPath?: string,
  bio?:string 
}