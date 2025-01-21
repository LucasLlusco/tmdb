import React from 'react'
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '../ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SeasonPaginationProps {
  currentSeason: number,
  totalSeasons: number
  basePathname: string
}

const SeasonPagination = ({currentSeason, totalSeasons, basePathname}:SeasonPaginationProps) => {
  return (
    <Pagination>
      <PaginationContent className='w-full justify-between'>
        <PaginationItem className='cursor-pointer'>
        {currentSeason > 1 && (
          <PaginationLink size={"sm"} href={`${basePathname}/season/${currentSeason -1}`}>
            <ChevronLeft className="h-4 w-4" />
            Season {currentSeason -1}
          </PaginationLink>           
        )}
        </PaginationItem>            
        <PaginationItem className='cursor-pointer'>
        {currentSeason < totalSeasons && (
          <PaginationLink size={"sm"} href={`${basePathname}/season/${currentSeason +1}`}>
            Season {currentSeason +1}
            <ChevronRight className="h-4 w-4" />
          </PaginationLink>  
        )}
        </PaginationItem>            
      </PaginationContent>
    </Pagination>
  )
}

export default SeasonPagination