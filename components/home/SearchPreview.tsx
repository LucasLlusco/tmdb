import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const SearchPreview = () => {
  return (
    <section className={"py-16 text-white bg-[url('/background-movies.jpg')]"}>
      <div className='container px-6'>
        <h2 className='text-[50px] font-bold'>Welcome.</h2>
        <h3 className='text-[32px]'>Millions of movies, TV shows to discover. Explore now.</h3>   
        <div className='mt-10 rounded-[30px] flex w-full items-center bg-white'>
          <Input 
            type="search" 
            placeholder="Search for a movie or tv show..." 
            className='text-black searchPreview-input rounded-[30px] ' />
          <Button 
            type="submit"
            className='rounded-[30px] h-12'
            >Search</Button>
        </div>     
      </div>
    </section>
  )
}

export default SearchPreview