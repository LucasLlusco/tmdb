import Genres from '@/components/discover/Genres'
import Providers from '@/components/discover/Providers'
import Regions from '@/components/discover/Regions'
import DiscoverResults from '@/components/discover/DiscoverResults'
import Sort from '@/components/discover/Sort'
import { SORT_OPTIONS } from '@/constants'
import { fromToInShowedMediaItems } from '@/lib/utils'
import { getDiscoveredItems } from '@/services/tmdb/shared'
import React from 'react'

interface DiscoverPageProps {
  params: {
    type: "movie" | "tv";
  }
  searchParams: {
    page?: number;
    sort?: string;
    region?: string;
    providers?: string;
    genres?: string;
  }
}


const DiscoverPage = async ({params, searchParams}: DiscoverPageProps) => {

  const formattedParams = {
    page: searchParams.page || 1,
    sort_by: searchParams.sort || SORT_OPTIONS[1].value, //default popularity_descending
    watch_region: searchParams.region || "AR", //default AR
    ...(!!searchParams.providers?.length) && {with_watch_providers: searchParams.providers},
    ...(!!searchParams.genres?.length) && {with_genres: searchParams.genres},
  }
  
  const { page, results, total_pages, total_results } = await getDiscoveredItems(params.type, formattedParams);

  const typeName = params.type === "movie" ? "Movies" : "TV Shows";
  const sortName = searchParams.sort?.startsWith("popularity") ? "Popular" : "Top Rated";
  const { from, to } = fromToInShowedMediaItems(page, total_pages, results.length, total_results);

  return (
    <main>
      <div className='container flex items-end justify-between !pb-6'>
        <h2 className='section-title !mb-0 !text-[22px]'>{sortName} {typeName}</h2>
        {total_results > 0 && <span className='text-[14px] opacity-70'>showing {from} - {to} of {total_results.toLocaleString()}</span>}
      </div>
      <div className='container flex flex-row gap-5 !pt-0'>
        <aside className="aside-section aside-box card-boxshadow h-fit">
          <Sort currentSort={searchParams.sort || SORT_OPTIONS[1].value} />
          <Regions currentRegion={searchParams.region || "AR"} />
          <Providers type={params.type} currentRegion={searchParams.region || "AR"} currentProviders={searchParams.providers!}/>
          <Genres type={params.type} currentGenres={searchParams.genres!} /> 
        </aside>
        <section className='main-section'>
          <DiscoverResults
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

export default DiscoverPage