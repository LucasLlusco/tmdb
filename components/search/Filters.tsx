"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SEARCH_FILTERS } from "@/constants"
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

interface SearchFiltersProps {
  moviesResults: string,
  tvResults: string,
  defaultType: string
}

const Filters = ({moviesResults, tvResults, defaultType}: SearchFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParams = (type:string) => {
    const params = new URLSearchParams(searchParams); 
    params.set("page", "1");

    const newUrl = `/search/${type}?${params.toString()}`;
    router.replace(newUrl); 
  }

  return (
    <Tabs defaultValue={defaultType} className="mt-1">
      <TabsList className='tabsList-col'>
        {SEARCH_FILTERS.map((filter) => (
          <TabsTrigger 
            key={filter.value} 
            value={filter.value} 
            onClick={() => updateSearchParams(filter.value)}
          >
            <span>{filter.name}</span>
            {filter.value === "movie" && (
              <span>{moviesResults}</span>
            )}
            {filter.value === "tv" && (
              <span>{tvResults}</span>
            )}              
          </TabsTrigger>          
        ))}
      </TabsList>
    </Tabs>
  )
}

export default Filters
