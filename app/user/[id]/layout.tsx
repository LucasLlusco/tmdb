"use client"
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/AuthContextProvider';
import { getUserDocument } from '@/lib/actions/user.actions';
import { getFormattedDate } from '@/lib/utils';
import { Edit } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface UserLayoutProps {
  children: Readonly<{children:React.ReactNode}>
  params: {
    id: string
  }
}

const UserLayout = ({children, params}: UserLayoutProps) => {
  const { user } = useAuthContext();
  const [userProfile, setUserProfile] = useState<UserType | null>(null);

  useEffect(() => {
    const handleGetUserDocument = async () => {
      const userDoc = await getUserDocument(params.id);
      setUserProfile(userDoc);
    }
    handleGetUserDocument();
  }, [])  

  const isOwner = user?.userId === userProfile?.userId;

  return (
    <>
      <section className="bg-[#1f1f1f] text-white">
        <div className='container flex gap-5'>
          {userProfile?.avatarUrl ? (
            <Image
              src={userProfile.avatarUrl}
              alt={userProfile.username}
              width={125}
              height={125}
              className='rounded-full !h-[125px]'
            />
          ) : (
            <span className='bg-cyan-600 text-white flex items-center justify-center rounded-full text-[50px] min-w-[125px] h-[125px] uppercase font-bold'>
              {userProfile?.username[0]}
            </span>            
          )}
          <div className='flex flex-col gap-1'>
            <h2 className='text-4xl font-bold'>{userProfile?.username}</h2>
            {userProfile && (
              <p className='opacity-70'>joined {getFormattedDate(userProfile.$createdAt!)}</p>
            )}
            <p className='mt-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit ex ullam aliquam quisquam, vel ipsam assum
              enda nemo? Vel dolores fugiat tempore perferendis ad. Velit maiores quisquam illo quidem perferendis asperiores?</p>
            <div className="flex gap-2 mt-6">
              {isOwner && (
                <Button asChild><Link href={"/settings/profile"}><Edit/>Edit profile</Link></Button>    
              )}
            </div>
          </div>
        </div>  
      </section>
      <nav className="card-boxshadow">
        <ul className='container !py-4 flex gap-12 justify-center'>
          <Link href={`/user/${userProfile?.userId}`}>Overview</Link>
          <Link href={`/user/${userProfile?.userId}/lists`}>Lists</Link>
          <Link href={`/user/${userProfile?.userId}/ratings`}>Ratings</Link>
          <Link href={`/user/${userProfile?.userId}/watchlist`}>Wachlist</Link>
          <Link href={`/user/${userProfile?.userId}/reviews`}>Reviews</Link>
        </ul>
      </nav>
      {children}
    </>
  )
}

export default UserLayout