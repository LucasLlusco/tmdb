"use client"
import Genres from '@/components/discover/Genres'
import Providers from '@/components/discover/Providers'
import ResultList from '@/components/discover/ResultList'
import Sort from '@/components/discover/Sort'
import { Button } from '@/components/ui/button'
import { SORT_OPTIONS } from '@/constants'
import { getDiscoveredItems } from '@/services/tmdb/shared'
import React, { useEffect, useState } from 'react'

interface DiscoverPageProps {
  params: {
    type?: string //movie or tv
  }
}

interface ResultsType {
  page: number,
  results: MediaItem[] | [],
  total_pages: number,
  total_results: number
}

const DiscoverPage = ({params}: DiscoverPageProps) => {
  const [results, setResults] = useState<ResultsType>({
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 1
  });
  const [filters, setFilters] = useState<DiscoverFiltersType>({
    selectedSort: SORT_OPTIONS[1].value, //default popularity_descending
    selectedRegion: "",
    selectedProviders: [],
    selectedGenres: [],
    page: 1,
    filtersHasChanged: false,
    showLoadMoreBtn: true
  });

  const formattedParams = (pageNumber?:number) => {
    const formattedSelectedProviders = filters.selectedProviders.join("|"); 
    const formattedSelectedGenres = filters.selectedGenres.join(",");

    return { 
      type: params.type, 
      params: {
        page: pageNumber ? pageNumber : 1,
        ...(!!filters.selectedSort.length) && {sort_by: filters.selectedSort},
        ...(!!filters.selectedRegion) ? {watch_region: filters.selectedRegion} : {watch_region: "AR"}, //default AR
        ...(!!filters.selectedProviders.length) && {with_watch_providers: formattedSelectedProviders},
        ...(!!filters.selectedGenres.length) && {with_genres: formattedSelectedGenres},
      }
    }
  }

  //initial, apply filters, and for infiniteScroll.
  const handleGetDiscoveredItems = async (nextPageNumber?:number) => {
    const res = await getDiscoveredItems(formattedParams(nextPageNumber));

    if(nextPageNumber! > 1) {
      setResults(prevResults => ({
        ...prevResults,
        results: [...prevResults.results, ...res.results]
      }))
    } else {
      setFilters(prevFilters => ({
        ...prevFilters,
        page: 1,
        filtersHasChanged: false,
        showLoadMoreBtn: true
      }))
      setResults(res);
    }
  }

  useEffect(() => {
    handleGetDiscoveredItems();
  }, [])

  const typeName = params.type === "movie" ? "Movies" : "TV Shows";
  const sortName = filters.selectedSort.startsWith("popularity") ? "Popular" : "Top Rated";
  
  return (
    <main>
      <div className='container flex items-end justify-between !pb-6'>
        <h2 className='section-title !mb-0 !text-[22px]'>{sortName} {typeName}</h2>
        <span className='text-[14px] opacity-70'>showing 1-{results.results.length} results of {results.total_results.toLocaleString()}</span>        
      </div>
      <div className='container flex flex-row gap-5 !pt-0'>
        <aside className="aside-section">
          <Sort filters={filters} setFilters={setFilters} />
          <Providers type={params.type!} filters={filters} setFilters={setFilters}  />
          <Genres type={params.type!} filters={filters} setFilters={setFilters} />
          <Button onClick={() => handleGetDiscoveredItems()} className='w-full' disabled={!filters.filtersHasChanged}>
            Apply filters
          </Button>
        </aside>
        <section className='main-section'>
          <ResultList 
            type={params.type!}
            filters={filters}
            setFilters={setFilters}
            handleGetDiscoveredItems={handleGetDiscoveredItems} 
            results={results?.results}
            total_pages={results.total_pages}
          />
        </section>        
      </div>
    </main>
  )
}

export default DiscoverPage