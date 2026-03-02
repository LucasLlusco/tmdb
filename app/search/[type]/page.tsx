import React from 'react'
import SearchResults from '@/components/search/SearchResults';
import { getSearchedItems } from '@/services/tmdb/shared';
import { fromToInShowedMediaItems } from '@/lib/utils';
import MediaTypes from '@/components/search/MediaTypes';

interface SearchPageProps {
  params: {
    type: "movie" | "tv";
  }
  searchParams: {
    query: string;
    page?: number;
  }
}

const SearchPage = async ({searchParams, params}: SearchPageProps) => {

  const formattedParams =  { 
    query: searchParams.query,
    page: searchParams.page || 1
  }

  const { page, results, total_pages, total_results } = await getSearchedItems(params.type, formattedParams);
  const { from, to } = fromToInShowedMediaItems(page, total_pages, results.length, total_results);

  return (
    <main>
     <div className='container flex items-end justify-between !pb-6'>
        <h2 className='section-title !mb-0 !text-[22px]'>Search Results</h2>
        {total_results > 0 && <span className='text-[14px] opacity-70'>showing {from} - {to} of {total_results.toLocaleString()}</span>}
      </div>
      <div className='container flex flex-row gap-5 !pt-0'>
        <aside className="aside-section h-fit">
          <MediaTypes currentType={params.type} currentQuery={searchParams.query} />
        </aside>
        <section className='main-section'>
          <SearchResults
            type={params.type}
            totalResults={total_results}
            results={results}
            currentPage={page}
            maxPage={total_pages}
          />
        </section>        
      </div>
    </main>
  )
}

export default SearchPage