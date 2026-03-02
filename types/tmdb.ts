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
  cast: Person[];
  crew: Person[];
} 
