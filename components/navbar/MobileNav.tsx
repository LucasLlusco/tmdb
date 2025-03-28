"use client"
import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import { useAuthContext } from '@/context/AuthContextProvider'
import { logout } from '@/lib/actions/auth.actions'
import { useRouter } from 'next/navigation'

const MobileNav = () => {
  const {user, setUser} = useAuthContext();
  const route = useRouter();
  
  const handleLogout = async () => {
    try {
     await logout();
     setUser(null); 
     route.push("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Sheet>
      <SheetTrigger><Menu/></SheetTrigger>
      <SheetContent side={"left"}>
        <SheetTitle className='mb-3'>
          <SheetClose asChild key={"title"}><Link href={"/"}>TheMovieDB</Link></SheetClose>
        </SheetTitle>
        <SheetDescription className={"hidden"} />
        <div className="flex flex-col gap-3 items-start">
          <SheetClose asChild key={"movie"}><Link href={"/discover/movie"}>Movies</Link></SheetClose>
          <SheetClose asChild key={"tv"}><Link href={"/discover/tv"}>TV Shows</Link></SheetClose>
        </div>
        <Separator className='my-4' />
        <div className="flex flex-col gap-3 items-start">
          {user ? (
            <SheetClose asChild key={"logout"}><p onClick={handleLogout} className='cursor-pointer'>Logout</p></SheetClose>
          ) : (
            <SheetClose asChild key={"login"}><Link href={"/login"}>Login</Link></SheetClose>
          )} 
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav