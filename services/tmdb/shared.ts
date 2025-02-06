"use server"
import { tmdbClient } from "@/lib/axiosInstances";
import { tmdbUrls } from "./urls";

export const getTrending = async (time:string) => {
  try {
    const response = await tmdbClient.get(tmdbUrls.shared.trending(time));
    const data = response.data; 
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const getPopular = async (type:string) => {
  let params;
  try {
    //para obtener mismos results que popular movies/tv en tmdb
    if(type === "movie") {
      params = {
        "sort_by": "popularity.desc",
      } 
    }
    if(type === "tv") {
      params = { 
        "sort_by": "popularity.desc",
        "watch_region": "AR" ,
        "with_watch_monetization_types": "flatrate|free|ads|rent|buy" 
      }  
    }
    const response = await tmdbClient.get(tmdbUrls.shared.popular(type), {params});
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const getSearchedItems = async ({type, params}:any) => {
  try {
    const response = await tmdbClient.get(tmdbUrls.shared.search(type), {params});
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const getDiscoveredItems = async ({type, params}:any) => {
  try {
    const response = await tmdbClient.get(tmdbUrls.shared.discover(type), {params});
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const getAvailableRegions = async () => {
  try {
    const response = await tmdbClient.get(tmdbUrls.shared.availableRegions);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const getProvidersByRegion = async ({type, params}: any) => {
  try {
    const response = await tmdbClient.get(tmdbUrls.shared.providersByRegion(type), {params});
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const getGenres = async (type:string) => {
  try {
    const response = await tmdbClient.get(tmdbUrls.shared.genres(type));
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error)
  }
}