"use client"
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { SearchIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface searchBarProps {
  searchBarOpen: boolean,
  setSearchBarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchBar = ({searchBarOpen, setSearchBarOpen} : searchBarProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchValue, setSearchValue] = useState(searchParams.get("query") || "");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/search/?query=${searchValue}`);
  }

  useEffect(() => {

    if(pathname === "/search" ) { 
      setSearchValue(searchParams.get("query")!); 
    } else { 
      setSearchValue(""); 
      setSearchBarOpen(false); 
    }
  },[pathname, searchParams]); 

  return (
    <>
    {searchBarOpen && (
      <div className='bg-white'>
        <form className='container py-1 flex items-center' onSubmit={handleSearch}>
          <SearchIcon className='text-black' />
          <Input 
            type="search" 
            placeholder="Search for a movie or tv show..." 
            className='text-black searchBarPreview-input rounded-[30px]' 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>      
      </div>      
    )}
    </>


  )
}

export default SearchBar