"use client"
import { getFormattedDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getMovieById } from '@/services/tmdb/movies'
import { getTvShowById } from '@/services/tmdb/tvShows'
import EditListForm from './EditListForm'
import DeleteListForm from './DeleteListForm'
import { useQuery } from '@tanstack/react-query'

interface ListCardProps {
  list: ListType
  isOwner: boolean
}

const ListCard = ({list, isOwner}: ListCardProps) => {
  const height = "141";
  const width = "94";

  const listPathname = `/list/${list.$id}`;
  let listImageSrc = "/default-media-img.svg";

  //get first element from list.
  const mediaType = list.itemsMediaType![0];
  const mediaId = list.items![0];
  const { data, isSuccess } = useQuery({
    queryKey: ["list-image", list.$id],
    queryFn: () => mediaType === "movie" ? getMovieById(String(mediaId)) : getTvShowById(String(mediaId)),
    enabled: !!list.items.length //only run when there is items.
  });

  if(isSuccess) {
    listImageSrc = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
  }

  return (
    <div className='flex flex-row gap-[10px] card-boxshadow rounded-[5px]'>
      <Link href={listPathname} className={`h-[${height}px] w-[${width}px] min-w-max`}>
        <Image 
          src={listImageSrc}
          alt={list.title} 
          className={`rounded-l-[5px] h-full max-w-none bg-[#dbdbdb]`}
          width={width}
          height={height}
        />
      </Link>   
      <div className={"flex flex-col py-[5px] justify-between"}>
        <div className="flex flex-col">
          <p className='text-base font-bold mb-[5px]'>
            <Link href={listPathname} className='link-black'>{list.title}</Link>
          </p>
          <p className='text-xs text-gray-500'>{list.items?.length} items</p>
          <p className='text-xs text-gray-500'>{list.isPublic ? "Public" : "Private"}</p>
          <p className='text-xs text-gray-500'>Modified {getFormattedDate(list.$updatedAt)}</p>
        </div>
        {isOwner && (
          <div className="flex gap-2 items-end">
            <EditListForm list={list} />
            <DeleteListForm list={list} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ListCard