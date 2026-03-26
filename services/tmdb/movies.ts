"use server"
import { tmdbUrls } from "./urls";
import { TMDB_IMG_URLS } from "@/constants";
import { tmdbFetch } from "./tmdbFetch";
import { TmdbCreditsResponse, TmdbPaginatedResponse } from "@/types/tmdb";

export const getMovieById = async(id: number) => {
  const data = await tmdbFetch<Movie>(tmdbUrls.movies.byId(id));
  
  const movie: Movie = {
    ...data, 
    poster_path: `${TMDB_IMG_URLS.media}/${data.poster_path}`
  };

  return movie;
}

export const getMovieCreditsById = async (id: number) => {
  const data = await tmdbFetch<TmdbCreditsResponse>(tmdbUrls.movies.creditsById(id));

  const cast: MovieCastMember[] = data.cast.map((person) => ({
    ...person,
    profile_path: `${TMDB_IMG_URLS.media}/${person.profile_path}`
  }));

  const crew: MovieCrewMember[] = data.crew.map((person) => ({
    ...person,
    profile_path: `${TMDB_IMG_URLS.media}/${person.profile_path}`
  }));

  return {
    cast,
    crew
  };
}

export const getMovieRecommendationsById = async (id: number) => {
  const data = await tmdbFetch<TmdbPaginatedResponse<MediaItem>>(tmdbUrls.movies.recommendationsById(id));

  const results: MediaItem[] = data.results.map((item:any) => ({
    ...item,
    media_type: "movie",
    poster_path: `${TMDB_IMG_URLS.media}/${item.poster_path}`
  }));
  
  return results;
}
