"use client"
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/lib/providers/AuthContextProvider';
import { getUserDocument } from '@/lib/actions/user.actions';
import { getFormattedDate } from '@/lib/utils';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserLayoutProps {
  children: Readonly<{children:React.ReactNode}>
  params: {
    id: string
  }
}

const UserLayout = ({children, params}: UserLayoutProps) => {
  const userId = params.id;
  const { user } = useAuthContext();
  const isOwner = user?.userId === userId;

  const { data: userProfile } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserDocument(userId),
    enabled: !isOwner //only run when the current user and this profile are different.
  });

  const username = isOwner ? user?.username : userProfile?.username;
  const avatarPath = isOwner ? user?.avatarPath : userProfile?.avatarPath;
  const avatarUrl = `https://fra.cloud.appwrite.io/v1${avatarPath}`;
  const bio = isOwner ? user?.bio : userProfile?.bio;
  const initial = username ? username[0] : "";
  const createdAt = isOwner ? user?.$createdAt : userProfile?.$createdAt;

  return (
    <>
      <section className="bg-[#1f1f1f] text-white">
        <div className='container flex gap-5'>
          {avatarPath ? (
            <Avatar className={"w-[125px] h-[125px]"} >
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>{username}</AvatarFallback>
            </Avatar>
          ) : (
            <span className='bg-cyan-600 text-white flex items-center justify-center rounded-full text-[50px] min-w-[125px] h-[125px] uppercase font-bold'>
              {initial}
            </span>
          )}
          <div className='flex flex-col gap-1'>
            <h2 className='text-4xl font-bold'>{username}</h2>
            {createdAt && (
              <p className='opacity-70 text-sm'>joined {getFormattedDate(createdAt)}</p>
            )}
            <p className='mt-2'>{bio}</p>
            <div className="flex gap-2 mt-5">
              {isOwner && (
                <Button asChild><Link href={"/settings/profile"}><Edit/>Edit profile</Link></Button>    
              )}
            </div>
          </div>
        </div>  
      </section>
      <nav className="card-boxshadow">
        <ul className='container !py-4 flex gap-12 justify-center'>
          <Link href={`/user/${userId}`}>Overview</Link>
          <Link href={`/user/${userId}/lists`}>Lists</Link>
          <Link href={`/user/${userId}/ratings`}>Ratings</Link>
          <Link href={`/user/${userId}/watchlist`}>Watchlist</Link>
          <Link href={`/user/${userId}/reviews`}>Reviews</Link>
        </ul>
      </nav>
      {children}
    </>
  )
}

export default UserLayout