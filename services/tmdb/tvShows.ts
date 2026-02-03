"use server"
import { tmdbClient } from "@/lib/axiosInstances";
import { tmdbUrls } from "./urls";
import { TMDB_IMG_URLS } from "@/constants";

export const getTvShowById = async (id:number) => {
  const response = await tmdbClient.get(tmdbUrls.tvShows.byId(id));
  const data: TvShow = {
    ...response.data, 
    poster_path: `${TMDB_IMG_URLS.media}/${response.data.poster_path}`
  };

  return data;
}

export const getTvShowCreditsById = async (id:number) => {
  const response = await tmdbClient.get(tmdbUrls.tvShows.creditsById(id));
  const data: Person[] = response.data.cast.map((person:any) => ({
    ...person,
    profile_path: `${TMDB_IMG_URLS.media}/${person.profile_path}`
  }));
  
  return data;
}

export const getTvShowImagesById = async (id:number) => {
  const response = await tmdbClient.get(tmdbUrls.tvShows.imagesById(id));

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

export const getTvShowVideosById = async (id:number) => {
  const response = await tmdbClient.get(tmdbUrls.tvShows.videosById(id));
  const data: Video[] = response.data.results; 
  return data;
}

export const getTvShowRecommendationsById = async (id:number) => {
  const response = await tmdbClient.get(tmdbUrls.tvShows.recommendationsById(id));
  const data: TvShowListItem[] = response.data.results.map((item: any) => ({
    ...item,
    media_type: "tv",
    poster_path: `${TMDB_IMG_URLS.media}/${item.poster_path}`
  })); 
  return data;
}

export const getTvShowSeasonById = async (id:number, season_number:number) => {
  const response = await tmdbClient.get(tmdbUrls.tvShows.seasonById(id, season_number));
  const data: TvShowSeason = {
    ...response.data,
    poster_path: `${TMDB_IMG_URLS.media}/${response.data.poster_path}`,
    episodes: response.data.episodes.map((episode:any) => ({
      ...episode,
      still_path: `${TMDB_IMG_URLS.media}/${episode.still_path}`
    }))
  };
  return data;
}