"use client"
import React, { useEffect, useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { getGenres } from '@/services/tmdb/shared';

interface GenresProps {
  type: string,
  filters: DiscoverFiltersType,
  setFilters: React.Dispatch<React.SetStateAction<DiscoverFiltersType>>
}

const Genres = ({type, filters, setFilters}:GenresProps) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  const handleFetchGenres = async () => {
    const res = await getGenres(type);
    setGenres(res.genres);
  }

  useEffect(() => {
    handleFetchGenres();
  }, [])

  const handleSelectedGenres = (genres:string[]) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      selectedGenres: genres,
      filtersHasChanged: true
    }))
  }
  
  return (
    <Accordion type="single" collapsible className="aside-box card-boxshadow">
      <AccordionItem value="item-3" className='border-b-0'>
        <AccordionTrigger className='border-b mb-4'>Filter by genres</AccordionTrigger>
        <AccordionContent className='flex flex-col gap-4'>
          <ToggleGroup 
            type="multiple" 
            value={filters.selectedGenres} 
            onValueChange={(value) => handleSelectedGenres(value)} 
            className='flex flex-wrap gap-[5px] justify-start'
            >
            {genres?.map((genre) => (
              <ToggleGroupItem 
                value={genre.id.toString()} 
                className='p-[10px]'
                >
                  {genre.name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default Genres