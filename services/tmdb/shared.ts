"use server"
import { tmdbUrls } from "./urls";
import { TMDB_IMG_URLS } from "@/constants";
import { tmdbFetch } from "./tmdbFetch";
import { TmdbGenresResponse, TmdbPaginatedResponse, TmdbProvidersResponse, TmdbRegionsResponse } from "@/types/tmdb";

export const getTrending = async (time:string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/tmdb/trending`, {
    method: "POST",
    body: JSON.stringify({ time })
  });

  if (!res.ok) {
    throw new Error("Failed to fetch trending items");
  }

  const data: { results: MediaItem[]} = await res.json(); 
  return data.results; 
}

export const getPopular = async (type:string) => {
  let params:any;
  //para obtener mismos results que popular movies/tv en tmdb
  if(type === "movie") {
    params = {
      sort_by: "popularity.desc",
    } 
  } else {
    params = { 
      sort_by: "popularity.desc",
      watch_region: "AR",
      with_watch_monetization_types: "flatrate|free|ads|rent|buy" 
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/tmdb/popular`, {
    method: "POST",
    body: JSON.stringify({ type, params })
  });

  if (!res.ok) {
    throw new Error("Failed to fetch popular items");
  }

  const data: { results: MediaItem[]} = await res.json();
  return data.results;
}

export const getSearchedItems = async (type: "movie" | "tv", params:any) => {
  const data = await tmdbFetch<TmdbPaginatedResponse<MediaItem>>(tmdbUrls.shared.search(type), params);

  const results: MediaItem[] = data.results.map((item:any) => ({
    ...item,
    media_type: type,
    poster_path: `${TMDB_IMG_URLS.media}${item.poster_path}`
  }));

  return {...data, results};
}

export const getDiscoveredItems = async (type: "movie" | "tv", params: any) => {  
  let additionalParams;
  if(type === "movie") { //para obtener los mismos resultados de movies que en tmdb.
    if(params.sort_by === "popularity.desc" || params.sort_by === "popularity.asc") {
      additionalParams = {
        include_adult: "false",
        include_video: "false",
        language: "en-US"
      }
    }
    if(params.sort_by === "vote_average.desc" || params.sort_by === "vote_average.asc") {
      additionalParams = {
        without_genres: "99,10755",
        "vote_count.gte": "200",
        include_adult: "false",
        include_video: "false",
        language: "en-US"
      }
    }
  } else { //para obtener los mismos resultados de tv que en tmdb.
    if(params.sort_by === "popularity.desc" || params.sort_by === "popularity.asc") {
      additionalParams = {
        with_watch_monetization_types: "flatrate|free|ads|rent|buy",
        include_adult: "false",
        language: "en-US"
      }
    }
    if(params.sort_by === "vote_average.desc" || params.sort_by === "vote_average.asc") {
      additionalParams = {
        "vote_count.gte": "200",
        include_adult: "false"
      }
    }
  }

  const finalParams = {
    ...params,
    ...additionalParams
  }

  const data = await tmdbFetch<TmdbPaginatedResponse<MediaItem>>(tmdbUrls.shared.discover(type), finalParams);

  const results: MediaItem[] = data.results.map((item: any) => ({
    ...item,
    media_type: type,
    poster_path: `${TMDB_IMG_URLS.media}${item.poster_path}`
  }));

  return {...data, results};
}

export const getAvailableRegions = async () => {
  const { results } = await tmdbFetch<TmdbRegionsResponse>(tmdbUrls.shared.availableRegions);

  return results;
}

export const getProvidersByRegion = async (type: "movie" | "tv", region: string) => {
  const { results } = await tmdbFetch<TmdbProvidersResponse>(tmdbUrls.shared.providersByRegion(type), {watch_region: region});

  return results;
}

export const getGenres = async (type: "movie" | "tv") => {
  const { genres } = await tmdbFetch<TmdbGenresResponse>(tmdbUrls.shared.genres(type));
  
  return genres;
}