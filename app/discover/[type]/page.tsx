"use client"
import Genres from '@/components/discover/Genres'
import Providers from '@/components/discover/Providers'
import Sort from '@/components/discover/Sort'
import { Button } from '@/components/ui/button'
import { SORT_OPTIONS } from '@/constants'
import { getDiscoveredItems } from '@/services/tmdb/shared'
import React, { useState } from 'react'

interface DiscoverPageProps {
  params: {
    type?: string //movie or tv
  }
}

const DiscoverPage = ({params}: DiscoverPageProps) => {
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState<DiscoverFiltersType>({
    selectedSort: SORT_OPTIONS[1].value, //default popularity_descending
    selectedRegion: "",
    selectedProviders: [],
    selectedGenres: [],
    filtersHasChanged: false
  });

  const formattedParams = () => {
    const formattedSelectedProviders = filters.selectedProviders.join("|"); 
    const formattedSelectedGenres = filters.selectedGenres.join(",");

    return { 
      type: params.type, 
      params: {
        ...(!!filters.selectedSort.length) && {sort_by: filters.selectedSort},
        ...(!!filters.selectedRegion) && {watch_region: filters.selectedRegion},
        ...(!!filters.selectedProviders.length) && {with_watch_providers: formattedSelectedProviders},
        ...(!!filters.selectedGenres.length) && {with_genres: formattedSelectedGenres},
      }
    }
  }

  const handleGetDiscoveredItems = async () => {
    //const res = await getDiscoveredItems(formattedParams);
    //setResults(res.results);
  }

  const typeName = params.type === "movie" ? "Movies" : "TV Shows";
  const sortName = filters.selectedSort.startsWith("popularity") ? "Popular" : "Top Rated";
  
  return (
    <main>
      <h2 className='container section-title !pb-0 !text-[22px]'>{sortName} {typeName}</h2>
      <div className='container flex flex-row gap-5 !pt-0'>
        <aside className="aside-section">
          <div className="aside-box card-boxshadow">
            <h3 className='section-title !mb-1'>Results</h3>    
            <p>type: {params.type}</p>
            <p>results: </p>
            <p>current page: </p>
            <p>total pages: </p>
            <p>total results: </p>
          </div>
          <Sort filters={filters} setFilters={setFilters} />
          <Providers type={params.type!} filters={filters} setFilters={setFilters}  />
          <Genres type={params.type!} filters={filters} setFilters={setFilters} />
          <Button onClick={handleGetDiscoveredItems} className='w-full' disabled={!filters.filtersHasChanged}>
            Apply filters
          </Button>
        </aside>
        <section className='main-section'>
        </section>        
      </div>
    </main>
  )
}

export default DiscoverPage