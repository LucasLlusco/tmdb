"use client"
import { getUserDocument } from '@/lib/actions/user.actions';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react'
import { getFormattedDate } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ListOwnerAvatar {
  list: ListType
  user: UserType | null
  isOwner: boolean
}

const ListOwnerAvatar = ({list, user, isOwner}: ListOwnerAvatar) => {
  const userId = list.userId;

  const { data: userProfile } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserDocument(userId),
    enabled: !isOwner
  });

  const username = isOwner ? user?.username : userProfile?.username;
  const avatarPath = isOwner ? user?.avatarPath : userProfile?.avatarPath;
  const avatarUrl = `https://fra.cloud.appwrite.io/v1${avatarPath}`;
  const initial = username ? username[0] : "";

  return (
    <div className="flex gap-2 items-center text-sm">
      {avatarPath ? (
        <Avatar className={"w-8 h-8"} >
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{username}</AvatarFallback>
        </Avatar>
        ) : (
          <span className='bg-cyan-600 text-white flex items-center justify-center rounded-full w-8 h-8 uppercase font-bold'>
            {initial}
          </span>
        )}
      <span>By <Link href={`/user/${userId}`} className="text-[#01b4e4e6]">{username}</Link></span>
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