"use client"
import React, { useEffect, useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface PaginationProps {
  currentPage: number,
  maxPage: number
}

const SearchPagination = ({currentPage, maxPage}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [currentPageItems, setCurrentPageItems] = useState<number[]>([]);
  const [currentPageItem, setCurrentPageItem] = useState(currentPage);
  const [firstAndLastItem, setFirstAndLastItem] = useState({
    first: 0,
    last: 0
  });


  const pageNumbers = Array.from({length: maxPage}, (_, i) => i + 1);
  const firstPage = pageNumbers[0];
  const lastPage = pageNumbers[pageNumbers.length -1]; 
  
  const handleNavigation = (newPage:number) => {
    
    const params = new URLSearchParams(searchParams); 
    params.set("page", newPage.toString()); 

    const newUrl = `${pathname}?${params.toString()}`; 
    console.log(newUrl);
    router.replace(newUrl); 
  }

  useEffect(() => {
    let startIndex = currentPageItem -5; 
    let lastIndex = currentPageItem +4; 
    if(startIndex < 1) { 
      startIndex = 0;
      lastIndex = 9; 
    }
    const currentPageNumbers = pageNumbers.slice(startIndex, lastIndex); 
    const firstEle = currentPageNumbers[0];
    const lastEle = currentPageNumbers[currentPageNumbers.length -1]; 

    if(!firstAndLastItem.first && !firstAndLastItem.last || currentPageItem === firstPage || currentPageItem === lastPage) { 
      setFirstAndLastItem({
        first: firstEle,
        last: lastEle 
      })
      setCurrentPageItems(currentPageNumbers);      
    }

    if(currentPageItem === firstAndLastItem.last && firstAndLastItem.last != lastPage) { 
      setCurrentPageItems(currentPageNumbers);
      setFirstAndLastItem({
        first: firstEle,
        last: lastEle
      })
    }

    if(currentPageItem === firstAndLastItem.first && firstAndLastItem.first != firstPage) { 
      let startIndex = firstAndLastItem.first - 5;
      let lastIndex = firstAndLastItem.first + 4; 
      if(startIndex < 1) { 
        startIndex = 0; 
        lastIndex = 9; 
      }
      
      const currentPageNumbers = pageNumbers.slice(startIndex, lastIndex); 
      const firstEle = currentPageNumbers[0]; 
      const lastEle = currentPageNumbers[currentPageNumbers.length -1]; 
      setCurrentPageItems(currentPageNumbers);
      setFirstAndLastItem({ 
        first: firstEle,
        last: lastEle
      })
    }

  }, [currentPageItem])

  const isPageInCurrentItems = (page:number) => {
    const index = currentPageItems.findIndex((pageItem) => pageItem === page);
    return index >= 0 ? true : false;
  }

  
  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious size={"sm"} onClick={() => {
              handleNavigation(currentPage - 1) 
              setCurrentPageItem(currentPage - 1)
            }} />
          </PaginationItem>
        )}
        {!isPageInCurrentItems(firstPage) && (
          <>
          <PaginationItem className='cursor-pointer'>
            <PaginationLink size={"sm"} onClick={() => {
              handleNavigation(firstPage)
              setCurrentPageItem(firstPage)
            }
            } isActive={firstPage === currentPage}>{firstPage}</PaginationLink>
          </PaginationItem>   
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>       
          </>      
        )}
        {currentPageItems.map((page) => (
          <PaginationItem className='cursor-pointer' key={page}>
            <PaginationLink size={"sm"} onClick={() => {
              handleNavigation(page)
              setCurrentPageItem(page)
            }
            } isActive={page === currentPage}>{page}</PaginationLink>
          </PaginationItem>
        ))}
        {!isPageInCurrentItems(lastPage) && ( 
          <>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>    
          <PaginationItem className='cursor-pointer'>
            <PaginationLink size={"sm"} onClick={() => {
              handleNavigation(lastPage)
              setCurrentPageItem(lastPage)
            }
            } isActive={lastPage === currentPage}>{lastPage}</PaginationLink>
          </PaginationItem>      
          </>      
        )} 
        {currentPage < maxPage && (
          <PaginationItem className="cursor-pointer">
            <PaginationNext size={"sm"} onClick={() => {
              handleNavigation(currentPage + 1)
              setCurrentPageItem(currentPage + 1)
            }} />
          </PaginationItem>          
        )}
      </PaginationContent>
    </Pagination>
  )
}

export default SearchPagination
