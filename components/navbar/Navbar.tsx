"use client"
import { Search as SearchIcon, User as UserIcon, X as CloseIcon} from 'lucide-react'
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
import MobileNav from './MobileNav'
import Link from 'next/link'

const Navbar = () => {
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  return (
    <header className='text-white bg-black'>
      <div className="container flex justify-between items-center py-4">
        <div className='flex sm:hidden'>
          <MobileNav />
        </div>
        <nav className='flex items-center gap-5'>
          <h1 className='mr-2 text-xl font-bold'><Link href={"/"}>TheMovieDB</Link></h1>
          <div className="hidden gap-5 items-center sm:flex">
            <a href="/">Movies</a>
            <a href="/">Tv series</a>            
          </div>            
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