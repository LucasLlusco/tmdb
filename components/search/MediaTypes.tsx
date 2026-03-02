import { getSearchedItems } from '@/services/tmdb/shared'
import React from 'react'
import MediaTypesTabs from './MediaTypesTabs'

interface MediaTypesProps {
  currentType: "movie" | "tv";
  currentQuery: string;
}

const MediaTypes = async({currentType, currentQuery} : MediaTypesProps) => {

  const formattedParams = {
    query: currentQuery,
    page: 1
  }

  const searchResults = await Promise.all([getSearchedItems("movie", formattedParams), getSearchedItems("tv", formattedParams)]);

  const movies = searchResults[0];
  const tvShows = searchResults[1];

  return (
    <MediaTypesTabs moviesResults={movies?.total_results} tvResults={tvShows?.total_results} currentType={currentType} /> 
  )
}

export default MediaTypes

