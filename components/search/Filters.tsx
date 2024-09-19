"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { searchFilters } from "@/constants"
import { useRouter } from 'next/navigation'
import React from 'react'

interface SearchFiltersProps {
  moviesResults: string,
  tvResults: string,
  defaultType: string
}

const Filters = ({moviesResults, tvResults, defaultType}: SearchFiltersProps) => {
  const router = useRouter();

  const updateSearchParams = (type:string) => {
    const searchParams = new URLSearchParams(window.location.search);

    const newPathname = `/search/${type}?${searchParams.toString()}`; 
    router.push(newPathname); 
  }



  return (
    <Tabs defaultValue={defaultType}>
      <TabsList className='tabsList-col'>
        {searchFilters.map((filter) => (
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
