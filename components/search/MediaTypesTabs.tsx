"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SEARCH_FILTERS } from "@/constants"
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

interface MediaTypesTabsProps {
  moviesResults: number;
  tvResults: number;
  currentType: "movie" | "tv";
}

const MediaTypesTabs = ({moviesResults, tvResults, currentType}: MediaTypesTabsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParams = (type:string) => {
    const params = new URLSearchParams(searchParams); 
    params.set("page", "1"); 

    const newPathname = `/search/${type}?${params.toString()}`;
    router.replace(newPathname);
  }

  return (
    <Tabs defaultValue={currentType}>
      <TabsList className='tabsList-col'>
        {SEARCH_FILTERS.map((filter) => (
          <TabsTrigger 
            key={filter.value} 
            value={filter.value} 
            onClick={() => updateSearchParams(filter.value)}
          >
            <span>{filter.name}</span>
            <span>{filter.value === "movie" ? `${moviesResults}` : `${tvResults}`}</span>
          </TabsTrigger>          
        ))}
      </TabsList>
    </Tabs>
  )
}

export default MediaTypesTabs
