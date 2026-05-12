import Genres from '@/components/discover/Genres'
import Providers from '@/components/discover/Providers'
import Regions from '@/components/discover/Regions'
import DiscoverResults from '@/components/discover/DiscoverResults'
import Sort from '@/components/discover/Sort'
import { SORT_OPTIONS } from '@/constants'
import { fromToInShowedMediaItems } from '@/lib/utils'
import { getDiscoveredItems } from '@/services/tmdb/shared'
import React from 'react'
import KeywordsSearchBar from '@/components/discover/KeywordsSearchBar'

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
    keywords?: string;
  }
}


const DiscoverPage = async ({params, searchParams}: DiscoverPageProps) => {
  const keywords: Keyword[] = JSON.parse(searchParams.keywords ?? "[]");

  const formattedParams = {
    page: searchParams.page || 1,
    sort_by: searchParams.sort || SORT_OPTIONS[1].value, //default popularity_descending
    watch_region: searchParams.region || "AR", //default AR
    ...(!!searchParams.providers?.length) && {with_watch_providers: searchParams.providers},
    ...(!!searchParams.genres?.length) && {with_genres: searchParams.genres},
    ...(!!searchParams.keywords?.length) && {with_keywords: keywords.map((k) => k.id).join("|")},
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
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-[250px_1fr] gap-5 !pt-0">
        <aside className="aside-section rounded-[5px] p-[10px] card-boxshadow">
          <Sort />
          <Regions />
          <Providers type={params.type} selectedRegion={searchParams.region || "AR"} />
          <Genres type={params.type} /> 
          <KeywordsSearchBar />
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