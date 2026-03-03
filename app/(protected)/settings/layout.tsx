"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuthContext } from '@/lib/providers/AuthContextProvider'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const SettingsLayout = ({children}: Readonly<{children:React.ReactNode}>) => {
  const { user, isLoading } = useAuthContext();
  const avatarUrl = `https://fra.cloud.appwrite.io/v1${user?.avatarPath}`;
  const route = useRouter();
  const pathname = usePathname();

  useEffect(() => { 
    if(!user && !isLoading) {
      route.replace("/login");
    }    
  }, [isLoading])
  
  if(isLoading) return null;
  
  const getDefaultValue = () => {
    const tabValues = ["profile", "change-email", "change-password", "delete"];
    const currrentRoute = pathname.split("/settings/")[1];

    const currentValue = tabValues.find((value => value == currrentRoute));
    return currentValue;
  }

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
        <nav className="aside-section h-fit">
          <Tabs defaultValue={getDefaultValue()}>
            <TabsList className='tabsList-col'>
              <TabsTrigger value={"profile"} asChild>
                <Link href={"/settings/profile"} >Edit profile</Link>
              </TabsTrigger>
              <TabsTrigger value={"change-email"} asChild>
                <Link href={"/settings/change-email"}>Change email</Link>
              </TabsTrigger>
              <TabsTrigger value={"change-password"} asChild>
                <Link href={"/settings/change-password"}>Change password</Link>
              </TabsTrigger>
              <TabsTrigger value={"delete"} asChild>
                <Link href={"/settings/delete"}>Delete account</Link>
              </TabsTrigger>                               
            </TabsList>
          </Tabs>             
        </nav>
        {children}
      </section>
    </>
  )
}

export default SettingsLayout