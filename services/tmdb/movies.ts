"use server"
import { tmdbClient } from "@/lib/axiosInstances";
import { tmdbUrls } from "./urls";

export const getMovieById = async (id:string) => {
  try {
    const response = await tmdbClient.get(tmdbUrls.movies.byId(id));
    const data = response.data; 
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const getMovieCreditsById = async (id:string) => {
  try {
    const response = await tmdbClient.get(tmdbUrls.movies.creditsById(id));
    const data = response.data; 
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const getMovieImagesById = async (id:string) => {
  try {
    const response = await tmdbClient.get(tmdbUrls.movies.imagesById(id));
    const data = response.data; 
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const getMovieVideosById = async (id:string) => {
  try {
    const response = await tmdbClient.get(tmdbUrls.movies.videosById(id));
    const data = response.data; 
    return data;
  } catch (error) {
    console.log(error)
  }
}
