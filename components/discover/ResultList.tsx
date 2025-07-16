"use client"
import React, { useEffect } from 'react'
import MediaList from '../shared/MediaList'
import { Button } from '../ui/button'
import { useInView } from "react-intersection-observer";

interface ResultListProps {
  type: "movie" | "tv",
  filters: DiscoverFiltersType,
  setFilters: React.Dispatch<React.SetStateAction<DiscoverFiltersType>>,
  handleGetDiscoveredItems: (nextPageNumber?:number) => Promise<void>,
  results: MediaItem[] | [],
  total_pages: number,
}

const ResultList = ({type, filters, setFilters, handleGetDiscoveredItems, results, total_pages}:ResultListProps) => {

  const loadMore = () => {
    handleGetDiscoveredItems(filters.page + 1);
    setFilters(prevFilters => ({
      ...prevFilters,
      page: prevFilters.page + 1,
      showLoadMoreBtn: false
    }))
  }

  const {ref, inView} = useInView({
    threshold: 1 
  });

  useEffect(() => {
    if(inView && !filters.showLoadMoreBtn && filters.page < total_pages && !filters.filtersHasChanged) {
      loadMore()
    }
  }, [inView])
  

  return (
    <>
    <MediaList items={results} direction="grid" itemType={type} itemRef={ref} />
    {filters.showLoadMoreBtn && filters.page < total_pages && !filters.filtersHasChanged && (
      <Button onClick={loadMore} className='w-full mt-6'>LOAD MORE</Button>
    )}
    </>
  )
}

export default ResultList