"use server"
import { tmdbClient } from "@/lib/axiosInstances";
import { tmdbUrls } from "./urls";
import { TMDB_IMG_URLS } from "@/constants";

interface MediaItemsResultType {
  page: number
  results: MediaItem[] | []
  total_pages: number
  total_results: number
}

export const getTrending = async (time:string) => {
  const response = await tmdbClient.get(tmdbUrls.shared.trending(time));
  const data: MediaItem[] = response.data.results.map((item:any) => ({
    ...item,
    poster_path: `${TMDB_IMG_URLS.media}/${item.poster_path}`
  }));
  return data;
}

export const getPopular = async (type:string) => {
  let params;
  //para obtener mismos results que popular movies/tv en tmdb
  if(type === "movie") {
    params = {
      "sort_by": "popularity.desc",
    } 
  } else {
    params = { 
      "sort_by": "popularity.desc",
      "watch_region": "AR" ,
      "with_watch_monetization_types": "flatrate|free|ads|rent|buy" 
    }
  } 
  
  const response = await tmdbClient.get(tmdbUrls.shared.popular(type), {params});
  const data: MediaItem[] = response.data.results.map((item: any) => ({
    ...item,
    media_type: type,
    poster_path: `${TMDB_IMG_URLS.media}/${item.poster_path}`
  }));

  return data;
}

export const getSearchedItems = async ({type, params}:any) => {
  const response = await tmdbClient.get(tmdbUrls.shared.search(type), {params});
  const data: MediaItemsResultType = response.data;
  data.results = data.results.map((item: any) => ({
    ...item,
    media_type: type,
    poster_path: `${TMDB_IMG_URLS.media}/${item.poster_path}`
  }));

  return data;
}

export const getDiscoveredItems = async ({type, params}:any) => {
  
  let additionalParams;
  if(type === "movie") { //para obtener los mismos resultados de movies que en tmdb.
    if(params.sort_by === "popularity.desc" || params.sort_by === "popularity.asc") {
      additionalParams = {
        "include_adult": "false",
        "include_video": "false",
        "language": "en-US"
      }
    }
    if(params.sort_by === "vote_average.desc" || params.sort_by === "vote_average.asc") {
      additionalParams = {
        "without_genres": "99,10755",
        "vote_count.gte":"200",
        "include_adult": "false",
        "include_video": "false",
        "language": "en-US"
      }
    }
  } else { //para obtener los mismos resultados de tv que en tmdb.
    if(params.sort_by === "popularity.desc" || params.sort_by === "popularity.asc") {
      additionalParams = {
        "with_watch_monetization_types": "flatrate|free|ads|rent|buy",
        "include_adult": "false",
        "language": "en-US"
      }
    }
    if(params.sort_by === "vote_average.desc" || params.sort_by === "vote_average.asc") {
      additionalParams = {
        "vote_count.gte": "200",
        "include_adult": "false"
      }
    }
  }

  const finalParams = {
    ...params,
    ...additionalParams
  }

  const response = await tmdbClient.get(tmdbUrls.shared.discover(type), {params: finalParams});
  const data: MediaItemsResultType = response.data;
  data.results = data.results.map((item: any) => ({
    ...item,
    media_type: type,
    poster_path: `${TMDB_IMG_URLS.media}/${item.poster_path}`
  }));
  return data;
}

export const getAvailableRegions = async () => {
  const response = await tmdbClient.get(tmdbUrls.shared.availableRegions);
  const data: Region[] = response.data.results;
  return data;
}

export const getProvidersByRegion = async ({type, params}: any) => {
  const response = await tmdbClient.get(tmdbUrls.shared.providersByRegion(type), {params});
  const data: Provider[] = response.data.results;
  return data;
}

export const getGenres = async (type:string) => {
  const response = await tmdbClient.get(tmdbUrls.shared.genres(type));
  const data: Genre[] = response.data.genres;
  return data;
}