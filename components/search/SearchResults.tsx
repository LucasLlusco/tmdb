import React from 'react'
import MediaList from '../shared/MediaList';
import MediaListPagination from '../shared/MediaListPagination';

interface SearchResultsProps {
  type: "movie" | "tv";
  results: MediaItem[] | [];
  totalResults: number;
  currentPage: number;
  maxPage: number;
}

const SearchResults = ({type, results, totalResults, currentPage, maxPage} : SearchResultsProps) => {

  return (
    <>
    {totalResults > 0 ? (
      <>
        <MediaList items={results} direction="column" />
        <MediaListPagination currentPage={currentPage} maxPage={maxPage} />
      </>
    ) : (
      <p>There are no {type === "movie" ? "Movies" : "TV Shows"} that matched your query.</p>
    )}
    </>
  )
}

export default SearchResults