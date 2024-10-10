import MediaList from '@/components/common/MediaList';
import { getSearchedItems } from '@/lib/actions/search.actions';
import React from 'react'
import Filters from '@/components/search/Filters';
import SearchPagination from '@/components/search/SearchPagination';

interface SearchPageProps {
  params: {
    type?: string
  }
  searchParams: {
    query: string,
    page?: string
  }
}

const SearchPage = async ({searchParams, params}: SearchPageProps) => {

  const formattedParams = (type:string) => { 
    return {
      type: params.type === type ? params.type : type, 
      query: searchParams.query,
      page: searchParams.page || 1
    }
  }

  const movieResults = await getSearchedItems(formattedParams("movie"));
  const tvResults = await getSearchedItems(formattedParams("tv"));

  const currentPage = params.type === "movie" ? movieResults.page : tvResults.page;
  const maxPage = params.type === "movie" ? movieResults.total_pages : tvResults.total_pages;


  return (
    <main className='container my-8 flex flex-row gap-5'>
      <aside className="aside-section">
        <div className="aside-box">          
          <h2>Search Results</h2>    
          <p>type: {params.type}</p>
          <p>query: {searchParams.query}</p>
          <p>page: {searchParams.page} </p>
          <Filters moviesResults={movieResults?.total_results} tvResults={tvResults?.total_results} defaultType={params.type!} /> 
        </div>
      </aside>
      <section className='main-section'>
        {/* {params.type === "movie" && movieResults?.results && (
          <MediaList items={movieResults.results} />
        )}
        {params.type === "tv" && movieResults?.results && (
          <MediaList items={tvResults.results} />
        )} */}
        <SearchPagination currentPage={currentPage} maxPage={maxPage} />
      </section>
    </main>
  )
}

export default SearchPage