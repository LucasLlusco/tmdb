"use client"
import { getUserDocument } from '@/lib/actions/user.actions';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react'
import { getFormattedDate } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ListOwnerAvatar {
  userId: string
  list: ListType
}

const ListOwnerAvatar = ({userId, list}: ListOwnerAvatar) => {
  const { data: userProfile } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserDocument(userId)
  });

  const avatarUrl = `https://fra.cloud.appwrite.io/v1${userProfile?.avatarPath}`;

  return (
    <div className="flex gap-2 items-center text-sm">
      {userProfile?.avatarPath ? (
        <Avatar className={"w-8 h-8"} >
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{userProfile.username}</AvatarFallback>
        </Avatar>
        ) : (
          <span className='bg-cyan-600 text-white flex items-center justify-center rounded-full w-8 h-8 uppercase font-bold'>
            {userProfile?.username[0]}
          </span>
        )}
      <span>By <Link href={`/user/${userId}`} className="text-[#01b4e4e6]">{userProfile?.username}</Link></span>
      {list && (
        <>
          <span className="opacity-70"> • Created {getFormattedDate(list.$createdAt!)}</span>
          <span className="opacity-70"> • Modified {getFormattedDate(list.$updatedAt!)}</span>                 
        </>
      )}
    </div>
  )
}

export default ListOwnerAvatar