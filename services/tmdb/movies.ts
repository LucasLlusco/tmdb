"use server"
import { tmdbClient } from "@/lib/axiosInstances";
import { tmdbUrls } from "./urls";

export const getMovieById = async (id:number) => {
  const response = await tmdbClient.get(tmdbUrls.movies.byId(id));
  const data: Movie = response.data; 
  return data;
}

export const getMovieCreditsById = async (id:number) => {
  const response = await tmdbClient.get(tmdbUrls.movies.creditsById(id));
  const data: Person[] = response.data.cast; 
  return data;
}

export const getMovieImagesById = async (id:number) => {
  const response = await tmdbClient.get(tmdbUrls.movies.imagesById(id));
  const data: {
    backdrops: Image[]
    posters: Image[]
  } = response.data; 
  return data;
}

export const getMovieVideosById = async (id:number) => {
  const response = await tmdbClient.get(tmdbUrls.movies.videosById(id));
  const data: Video[] = response.data.results; 
  return data;
}

export const getMovieRecommendationsById = async (id:number) => {
  const response = await tmdbClient.get(tmdbUrls.movies.recommendationsById(id));
  const data: MovieListItem[] = response.data.results.map((item: any) => ({
    ...item,
    media_type: "movie"
  }));
  return data;
}
