"use server"
import { tmdbClient } from "@/lib/axiosInstances";
import { tmdbUrls } from "./urls";

export const getTvShowById = async (id:number) => {
  const response = await tmdbClient.get(tmdbUrls.tvShows.byId(id));
  const data: TvShow = response.data; 
  return data;
}

export const getTvShowCreditsById = async (id:number) => {
  const response = await tmdbClient.get(tmdbUrls.tvShows.creditsById(id));
  const data: Person[] = response.data.cast; 
  return data;
}

export const getTvShowImagesById = async (id:number) => {
  const response = await tmdbClient.get(tmdbUrls.tvShows.imagesById(id));
  const data: {
    backdrops: Image[]
    posters: Image[]
  } = response.data; 
  return data;
}

export const getTvShowVideosById = async (id:number) => {
  const response = await tmdbClient.get(tmdbUrls.tvShows.videosById(id));
  const data: Video[] = response.data.results; 
  return data;
}

export const getTvShowRecommendationsById = async (id:number) => {
  const response = await tmdbClient.get(tmdbUrls.tvShows.recommendationsById(id));
  const data: TvShowListItem[] = response.data.results.map((item: any) => ({
    ...item,
    media_type: "tv"
  })); 
  return data;
}

export const getTvShowSeasonById = async (id:number, season_number:number) => {
  const response = await tmdbClient.get(tmdbUrls.tvShows.seasonById(id, season_number));
  const data: TvShowSeason = response.data; 
  return data;
}