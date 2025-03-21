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
  const [user, setUser] = useState(true);

  return (
    <header className='text-white bg-black'>
      <div className="container flex justify-between items-center !py-4">
        <div className='flex sm:hidden'>
          <MobileNav />
        </div>
        <nav className='flex items-center gap-5'>
          <h1 className='mr-2 text-xl font-bold'><Link href={"/"}>TheMovieDB</Link></h1>
          <div className="hidden gap-5 items-center sm:flex">
            <Link href={"/discover/movie"}>Movies</Link>
            <Link href={"/discover/tv"}>TV Shows</Link>
          </div>            
        </nav>
        <div className='flex gap-5 items-center'>
          {!user && (
            <>
              <Link href={"/login"} className='hidden sm:block'>Login</Link>
              <Link href={"/signup"} className='hidden sm:block'>Sign up</Link>
            </>
          )}
          <DropdownMenu>
            {user ? (
              <DropdownMenuTrigger><UserIcon /></DropdownMenuTrigger>         
            ) : (
              <DropdownMenuTrigger className='sm:hidden'><UserIcon /></DropdownMenuTrigger>
            )}
            <DropdownMenuContent>
              {user ? (
                <>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Lists</DropdownMenuItem>
                  <DropdownMenuItem>Favorites</DropdownMenuItem>
                  <DropdownMenuItem>Watchlist</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Edit profile</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setUser(false)}>Logout</DropdownMenuItem>
                </>                 
              ) : (
                <>
                  <DropdownMenuItem><Link href={"/login"}>Login</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Link href={"/signup"}>Sign up</Link></DropdownMenuItem>                  
                </> 
              )}
              </DropdownMenuContent>
            </DropdownMenu>

          {searchBarOpen ? (
            <CloseIcon onClick={() => setSearchBarOpen(!searchBarOpen)} className='cursor-pointer' />
          ) : (
            <SearchIcon onClick={() => setSearchBarOpen(!searchBarOpen)} className='cursor-pointer'/>  
          )}          
        </div>
      </div> 
      <SearchBar searchBarOpen={searchBarOpen} setSearchBarOpen={setSearchBarOpen} />     
    </header>
  )
}

export default Navbar