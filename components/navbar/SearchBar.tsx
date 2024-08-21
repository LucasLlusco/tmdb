import React from 'react'
import { Input } from '../ui/input'
import { SearchIcon } from 'lucide-react'

interface searchBarProps {
  searchBarOpen: boolean,
  setSearchBarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchBar = ({searchBarOpen, setSearchBarOpen} : searchBarProps) => {
  return (
    <>
    {searchBarOpen && (
      <div className='bg-white'>
        <div className='container py-1 flex items-center'>
          <SearchIcon className='text-black' />
          <Input 
          type="search" 
          placeholder="Search for a movie or tv show..." 
          className='text-black searchPreview-input rounded-[30px] ' />
        </div>      
      </div>      
    )}
    </>


  )
}

export default SearchBar