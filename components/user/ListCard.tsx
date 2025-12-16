"use client"
import { getFormattedDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { getMovieById } from '@/services/tmdb/movies'
import { getTvShowById } from '@/services/tmdb/tvShows'
import EditListForm from './EditListForm'
import DeleteListForm from './DeleteListForm'

interface ListCardProps {
  list: ListType
  isOwner: boolean
}

const ListCard = ({list, isOwner}: ListCardProps) => {
  const [imgSrc, setImgSrc] = useState("/default-media-img.svg");
  const imgSrcAlt = "/default-media-img.svg";

  const height = "141";
  const width = "94";

  const pathname = usePathname();
  const listPathname = `${pathname}/${list.$id}`;

  const handleGetFirstMediaItem = async () => {
    const mediaType = list.itemsMediaType![0];
    const mediaId = list.items![0];

    if(mediaType == "movie") {
      const movie = await getMovieById(String(mediaId));
      setImgSrc(`https://image.tmdb.org/t/p/w500/${movie.poster_path}`);
    } else {
      const tvShow = await getTvShowById(String(mediaId));
      setImgSrc(`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`);
    }
  }


  useEffect(() => {
    if(list.items?.length! > 0) {
      handleGetFirstMediaItem();
    }
  }, [])
  
  return (
    <div className='flex flex-row gap-[10px] card-boxshadow rounded-[5px]'>
      <Link href={listPathname} className={`h-[${height}px] w-[${width}px] min-w-max`}>
        <Image 
          src={imgSrc}
          alt={list.title} 
          className={`rounded-l-[5px] h-full max-w-none bg-[#dbdbdb]`}
          width={width}
          height={height}
          onError={() => setImgSrc(imgSrcAlt)}
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
            <EditListForm listId={list.$id} title={list.title} isPublic={list.isPublic} />
            <DeleteListForm listId={list.$id} title={list.title} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ListCard