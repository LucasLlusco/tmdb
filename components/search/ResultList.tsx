import React from 'react'
import MediaList from '../shared/MediaList';
import SearchPagination from './SearchPagination';
import { getSearchedItems } from '@/services/tmdb/shared';

interface ResultListProps {
  searchParams:{
    type: "movie" | "tv",
    params: {
      query: string,
      page: number
    }    
  }
}

const ResultList = async ({searchParams}:ResultListProps) => {
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
      <p>There are no {searchParams.type === "movie" ? "Movies" : "TV Shows"} that matched your query.</p>
    )}
    </>
  )
}

export default ResultList