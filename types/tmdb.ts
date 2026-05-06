export interface TmdbPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TmdbGenresResponse {
  genres: Genre[];
}

export interface TmdbProvidersResponse {
  results: Provider[];
}

export interface TmdbRegionsResponse {
  results: Region[];
}

export interface TmdbVideosResponse {
  id: number;
  results: Video[];
} 

export interface TmdbImagesResponse {
  id: number;
  backdrops: Image[];
  logos: Image[];
  posters: Image[];
} 

export interface TmdbCreditsResponse {
  id: number;
  cast: MovieCastMember[];
  crew: MovieCrewMember[];
} 

export interface TmdbAggregateCreditsResponse {
  id: number;
  cast: TvShowCastMember[];
  crew: TvShowCrewMember[];
} 

export interface TmdbMovieKeywordsResponse {
  id: number;
  keywords: {
    id: number
    name: string;
  }[];
}

export interface TmdbTvShowKeywordsResponse {
  id: number;
  results: {
    id: number
    name: string;
  }[];
}

export interface TmdbCollectionResponse {
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: MediaItem[];
}