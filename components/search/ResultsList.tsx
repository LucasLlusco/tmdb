import { getSearchedItems } from '@/lib/actions/search.actions';
import React from 'react'
import MediaList from '../common/MediaList';
import SearchPagination from './SearchPagination';

interface ResultsListProps {
  params: {
    type: string,
    query: string,
    page: number
  }
}


const ResultsList = async ({params}:ResultsListProps) => {
  const results = await getSearchedItems(params);

  const currentPage = results.page;
  const maxPage = results.total_pages;

  return (
    <>
    {results.total_results > 0 ? (
      <>
        <MediaList items={results.results} direction="column" />
        <SearchPagination currentPage={currentPage} maxPage={maxPage} />
      </>
    ) : (
      <p>There are no {params.type === "movie" ? "movies" : "TV shows"} that matched your query.</p>
    )}
    </>
  )
}

export default ResultsList