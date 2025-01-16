"use server"
import { tmdbClient } from "@/lib/axiosInstances";
import { tmdbUrls } from "./urls";

export const getTvShowById = async (id:string) => {
  try {
    const response = await tmdbClient.get(tmdbUrls.tvShows.byId(id));
    const data = response.data; 
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const getTvShowCreditsById = async (id:string) => {
  try {
    const response = await tmdbClient.get(tmdbUrls.tvShows.creditsById(id));
    const data = response.data; 
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const getTvShowImagesById = async (id:string) => {
  try {
    const response = await tmdbClient.get(tmdbUrls.tvShows.imagesById(id));
    const data = response.data; 
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const getTvShowVideosById = async (id:string) => {
  try {
    const response = await tmdbClient.get(tmdbUrls.tvShows.videosById(id));
    const data = response.data; 
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const getTvShowRecommendationsById = async (id:string) => {
  try {
    const response = await tmdbClient.get(tmdbUrls.tvShows.recommendationsById(id));
    const data = response.data; 
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const getTvShowSeasonById = async (id:string, season_number:string) => {
  try {
    const response = await tmdbClient.get(tmdbUrls.tvShows.seasonById(id, season_number));
    const data = response.data; 
    return data;
  } catch (error) {
    console.log(error)
  }
}