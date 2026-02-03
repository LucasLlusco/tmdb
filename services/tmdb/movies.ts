"use server"
import { tmdbClient } from "@/lib/axiosInstances";
import { tmdbUrls } from "./urls";
import { TMDB_IMG_URLS } from "@/constants";

export const getMovieById = async (id:number) => {
  const response = await tmdbClient.get(tmdbUrls.movies.byId(id));
  const data: Movie = {
    ...response.data, 
    poster_path: `${TMDB_IMG_URLS.media}/${response.data.poster_path}`
  };

  return data;
}

export const getMovieCreditsById = async (id:number) => {
  const response = await tmdbClient.get(tmdbUrls.movies.creditsById(id));
  const data: Person[] = response.data.cast.map((person:any) => ({
    ...person,
    profile_path: `${TMDB_IMG_URLS.media}/${person.profile_path}`
  }));

  return data;
}

export const getMovieImagesById = async (id:number) => {
  const response = await tmdbClient.get(tmdbUrls.movies.imagesById(id));
  
  const backdrops: Image[] = response.data.backdrops.map((backdrop:any) => ({
    ...backdrop,
    file_path: `${TMDB_IMG_URLS.backdrops}/${backdrop.file_path}`
  }))

  const posters: Image[] = response.data.posters.map((poster:any) => ({
    ...poster,
    file_path: `${TMDB_IMG_URLS.posters}/${poster.file_path}`
  }))

  return {
    backdrops,
    posters
  };
}

export const getMovieVideosById = async (id:number) => {
  const response = await tmdbClient.get(tmdbUrls.movies.videosById(id));
  const data: Video[] = response.data.results; 

  return data;
}

export const getMovieRecommendationsById = async (id:number) => {
  const response = await tmdbClient.get(tmdbUrls.movies.recommendationsById(id));
  const data: MovieListItem[] = response.data.results.map((item:any) => ({
    ...item,
    media_type: "movie",
    poster_path: `${TMDB_IMG_URLS.media}/${item.poster_path}`
  }));
  
  return data;
}
