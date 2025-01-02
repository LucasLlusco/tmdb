import React from 'react'
import MediaList from '../shared/MediaList';
import SearchPagination from './SearchPagination';
import { getSearchedItems } from '@/services/tmdb/shared';

interface ResultsListProps {
  searchParams:{
    type: string,
    params: {
      query: string,
      page: number
    }    
  }
}

const ResultsList = async ({searchParams}:ResultsListProps) => {
  const results = await getSearchedItems(searchParams);

  const currentPage = results.page;
  const maxPage = results.total_pages;

  return (
    <>
    {results.total_results > 0 ? (
      <>
        <MediaList items={results.results} direction="column" itemType={searchParams.type} />
        <SearchPagination currentPage={currentPage} maxPage={maxPage} />
      </>
    ) : (
      <p>There are no {searchParams.type === "movie" ? "movies" : "TV shows"} that matched your query.</p>
    )}
    </>
  )
}

export default ResultsList