"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthContext } from '@/lib/providers/AuthContextProvider'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const SettingsLayout = ({children}: Readonly<{children:React.ReactNode}>) => {
  const { user, isLoading } = useAuthContext();
  const avatarUrl = `https://fra.cloud.appwrite.io/v1${user?.avatarPath}`;
  const route = useRouter();

  useEffect(() => { 
    if(!user && !isLoading) {
      route.replace("/login");
    }    
  }, [isLoading])
  
  if(isLoading) return null;
  
  return (
    <>
      <section className="bg-[#1f1f1f] text-white">
        <div className='container flex gap-5 items-center'>
          <Link href={`/user/${user?.userId}`}>
            {user?.avatarPath ? (
              <Avatar className={"w-[55px] h-[55px]"} >
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>{user.username}</AvatarFallback>
              </Avatar> 
            ) : (
              <span className='bg-cyan-600 text-white flex items-center justify-center rounded-full text-[26px] min-w-[55px] h-[55px] uppercase font-bold'>
                {user?.username[0]}
              </span>
            )}        
          </Link>
          <div className='flex flex-col gap-1'>
            <h2 className='text-3xl font-bold'><Link href={`/user/${user?.userId}`}>{user?.username}</Link></h2>
          </div>
        </div>  
      </section>
      <section className='container flex flex-row gap-5'>
        <nav className="card-boxshadow w-[355px] flex flex-col h-fit">
          <Link href={"/settings/profile"} className='p-3'>Edit profile</Link>
          <Link href={"/settings/delete"} className='p-3'>Delete account</Link>
        </nav>
        {children}
      </section>
    </>
  )
}

export default SettingsLayout