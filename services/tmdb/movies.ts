"use server"
import { tmdbUrls } from "./urls";
import { TMDB_IMG_URLS } from "@/constants";
import { tmdbFetch } from "./tmdbFetch";
import { TmdbCreditsResponse, TmdbImagesResponse, TmdbPaginatedResponse, TmdbVideosResponse } from "@/types/tmdb";

export const getMovieById = async(id:number) => {
  const data = await tmdbFetch<Movie>(tmdbUrls.movies.byId(id));
  
  const movie: Movie = {
    ...data, 
    poster_path: `${TMDB_IMG_URLS.media}/${data.poster_path}`
  };

  return movie;
}

export const getMovieCreditsById = async (id:number) => {
  const data = await tmdbFetch<TmdbCreditsResponse>(tmdbUrls.movies.creditsById(id));

  const cast: Person[] = data.cast.map((person) => ({
    ...person,
    profile_path: `${TMDB_IMG_URLS.media}/${person.profile_path}`
  }));

  return cast;
}

export const getMovieImagesById = async (id:number) => {
  const data = await tmdbFetch<TmdbImagesResponse>(tmdbUrls.movies.imagesById(id));

  const backdrops: Image[] = data.backdrops.map((backdrop) => ({
    ...backdrop,
    file_path: `${TMDB_IMG_URLS.backdrops}/${backdrop.file_path}`
  }))

  const posters: Image[] = data.posters.map((poster) => ({
    ...poster,
    file_path: `${TMDB_IMG_URLS.posters}/${poster.file_path}`
  }))

  return {
    backdrops,
    posters
  };
}

export const getMovieVideosById = async (id:number) => {
  const { results } = await tmdbFetch<TmdbVideosResponse>(tmdbUrls.movies.videosById(id));

  return results;
}

export const getMovieRecommendationsById = async (id:number) => {
  const data = await tmdbFetch<TmdbPaginatedResponse<MediaItem>>(tmdbUrls.movies.recommendationsById(id));

  const results: MediaItem[] = data.results.map((item:any) => ({
    ...item,
    media_type: "movie",
    poster_path: `${TMDB_IMG_URLS.media}/${item.poster_path}`
  }));
  
  return results;
}
