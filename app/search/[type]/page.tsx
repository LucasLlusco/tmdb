import React, { Suspense } from 'react'
import Filters from '@/components/search/Filters';
import ResultList from '@/components/search/ResultList';
import { getSearchedItems } from '@/services/tmdb/shared';

interface SearchPageProps {
  params: {
    type: "movie" | "tv"
  }
  searchParams: {
    query: string,
    page?: number
  }
}

const SearchPage = async ({searchParams, params}: SearchPageProps) => {

  const formattedParams = (type:"movie" | "tv") => { 
    return { 
      type: params.type === type ? params.type : type, 
      params: {
        query: searchParams.query,
        page: searchParams.page || 1 
      }
    }
  }

  const movieResults = await getSearchedItems(formattedParams("movie"));
  const tvResults = await getSearchedItems(formattedParams("tv"));

  return (
    <main className='container flex flex-row gap-5'>
      <aside className="aside-section">
        <div className="aside-box card-boxshadow">
          <h2 className='section-title !mb-1'>Search Results</h2>
          <p>type: {params.type}</p>
          <p>query: {searchParams.query}</p>
          <Filters moviesResults={movieResults?.total_results} tvResults={tvResults?.total_results} defaultType={params.type!} /> 
        </div>
      </aside>
      <section className='main-section'>
        <Suspense fallback={<p>Loading results...</p>}>
          <ResultList searchParams={formattedParams(params.type!)} />
        </Suspense>
      </section>
    </main>
  )
}

export default SearchPage