"use client"
import { Search as SearchIcon, User as UserIcon, X as CloseIcon} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React, { useState } from 'react'
import SearchBar from './SearchBar'
import MobileNav from './MobileNav'
import Link from 'next/link'
import { useAuthContext } from '@/lib/providers/AuthContextProvider'
import { logout } from '@/lib/actions/auth.actions'
import { usePathname, useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

const Navbar = () => {
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const {user, setUser} = useAuthContext();
  const route = useRouter();
  const pathname = usePathname();
  
  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setUser(null);
      toast.success("You have been logged out");
      if(pathname.startsWith("/settings")) {
        route.replace("/login");
      }
    },
    onError: () => {
      toast.error("Error logging out. Please try again");
    }
  });

  const handleLogout = () => {
    mutate();
  }

  const avatarUrl = `https://fra.cloud.appwrite.io/v1${user?.avatarPath}`;

  return (
    <header className='text-white bg-black min-h-[64px]'>
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
              <DropdownMenuTrigger>
                {user.avatarPath ? (
                  <Avatar className={"w-8 h-8"} >
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>{user.username}</AvatarFallback>
                  </Avatar>
                ) : (
                  <span className='bg-cyan-600 text-white flex items-center justify-center rounded-full w-8 h-8 uppercase font-bold'>
                    {user.username[0]}
                  </span>
                )}
              </DropdownMenuTrigger>         
            ) : (
              <DropdownMenuTrigger className='sm:hidden'><UserIcon /></DropdownMenuTrigger>
            )}
            <DropdownMenuContent className='w-40'>
              {user ? (
                <>
                  <DropdownMenuItem>
                    <Link href={`/user/${user.userId}`} className='font-semibold flex flex-col w-full'>
                      {user.username}<span className='font-normal text-[10px]'>View profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Link href={`/user/${user.userId}/lists`} className='w-full'>Your lists</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link href={`/user/${user.userId}/ratings`} className='w-full'>Your ratings</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link href={`/user/${user.userId}/watchlist`} className='w-full'>Your watchlist</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Link href={"/settings/profile"} className='w-full'>Edit profile</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className='cursor-pointer w-full'>Logout</DropdownMenuItem>
                </>                 
              ) : (
                <>
                  <DropdownMenuItem><Link href={"/login"} className='w-full'>Login</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Link href={"/signup"} className='w-full'>Sign up</Link></DropdownMenuItem>     
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