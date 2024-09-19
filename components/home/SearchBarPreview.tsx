"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const SearchBarPreview = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();


  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search/movie?query=${searchValue}`);

  }


  return (
    <form className='mt-10 rounded-[30px] flex w-full items-center bg-white' onSubmit={handleSearch}>
      <Input 
        type="search" 
        placeholder="Search for a movie or tv show..." 
        className='text-black searchBarPreview-input rounded-[30px] ' 
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button 
        type="submit"
        className='rounded-[30px] h-12'
      >
        Search
      </Button>
    </form>     
  )
}

export default SearchBarPreview