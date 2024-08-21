"use client"
import { Search as SearchIcon, User as UserIcon, X as CloseIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React, { useState } from 'react'
import SearchBar from './SearchBar'

const Navbar = () => {
  const [searchBarOpen , setSearchBarOpen ] = useState(false);

  return (
    <header className='text-white bg-black'>
      <div className="container flex justify-between py-4">
        <nav className='flex gap-5 items-center'>
          <h1 className='mr-2 text-xl font-bold'>TheMovieDB</h1>
          <a href="/">Movies</a>
          <a href="/">Tv series</a>
        </nav>
        <div className='flex gap-5 items-center'>
          <DropdownMenu>
            <DropdownMenuTrigger><UserIcon /></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Lists</DropdownMenuItem>
              <DropdownMenuItem>Favorites</DropdownMenuItem>
              <DropdownMenuItem>Watchlist</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {searchBarOpen ? (
            <CloseIcon onClick={() => setSearchBarOpen(!searchBarOpen)} className='cursor-pointer' />
          ): (
            <SearchIcon onClick={() => setSearchBarOpen(!searchBarOpen)} className='cursor-pointer'/>  
          )}          
        </div>
      </div> 
      <SearchBar searchBarOpen={searchBarOpen} setSearchBarOpen={setSearchBarOpen} />     
    </header>
  )
}

export default Navbar