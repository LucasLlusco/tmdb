"use server"
import { tmdbUrls } from "./urls";
import { TMDB_IMG_URLS } from "@/constants";
import { tmdbFetch } from "./tmdbFetch";
import { TmdbAggregateCreditsResponse, TmdbPaginatedResponse } from "@/types/tmdb";

export const getTvShowById = async (id: number) => {
  const data = await tmdbFetch<TvShow>(tmdbUrls.tvShows.byId(id));

  const tvShow: TvShow = {
    ...data, 
    poster_path: `${TMDB_IMG_URLS.media}/${data.poster_path}`,
    seasons: data.seasons.map((season) => ({
      ...season,
      poster_path: `${TMDB_IMG_URLS.media}/${season.poster_path}`
    })),
    last_episode_to_air: {
      ...data.last_episode_to_air,
      still_path: `${TMDB_IMG_URLS.media}/${data.last_episode_to_air.still_path}`
    }
  };

  return tvShow;
}

export const getTvShowCreditsById = async (id: number) => {
  const data = await tmdbFetch<TmdbAggregateCreditsResponse>(tmdbUrls.tvShows.aggregateCreditsById(id));

  const cast: TvShowCastMember[] = data.cast.map((person) => ({
    ...person,
    profile_path: `${TMDB_IMG_URLS.media}/${person.profile_path}`
  }));

  const crew: TvShowCrewMember[] = data.crew.map((person) => ({
    ...person,
    profile_path: `${TMDB_IMG_URLS.media}/${person.profile_path}`
  }));
  
  return {
    cast,
    crew
  };
}

export const getTvShowRecommendationsById = async (id: number) => {
  const data = await tmdbFetch<TmdbPaginatedResponse<MediaItem>>(tmdbUrls.tvShows.recommendationsById(id));

  const results: MediaItem[] = data.results.map((item:any) => ({
    ...item,
    media_type: "tv",
    poster_path: `${TMDB_IMG_URLS.media}/${item.poster_path}`
  }));

  return results;
}

export const getTvShowSeasonById = async (id: number, season_number: number) => {
  const data = await tmdbFetch<TvShowSeason>(tmdbUrls.tvShows.seasonById(id, season_number));

  const season: TvShowSeason = {
    ...data,
    poster_path: `${TMDB_IMG_URLS.media}/${data.poster_path}`,
    episodes: data.episodes.map((episode) => ({
      ...episode,
      still_path: `${TMDB_IMG_URLS.media}/${episode.still_path}`
    }))
  };

  return season;
}