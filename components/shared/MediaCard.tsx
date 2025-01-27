"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bookmark, Ellipsis, Heart, List } from 'lucide-react'
import { cn, getFormattedDate, getUserScore, getUserScoreColor } from '@/lib/utils'

const MediaCard = ({item, direction, itemType}: MediaCardProps) => {
  const [imgSrc, setImgSrc] = useState(`https://image.tmdb.org/t/p/w500/${item.poster_path}`);
  const imgSrcAlt = "/default-media-img.svg";

  const progressValue = getUserScore(item?.vote_average);
  const progresscolor = getUserScoreColor(getUserScore(item?.vote_average));
  const circularProgressStyles = {
    background: `conic-gradient(${progresscolor.bar} ${progressValue * 3.6}deg, ${progresscolor.track} 0deg)`,
  }

  let mediaType;
  if(itemType) {
    mediaType = itemType;
  } else {
    mediaType = item.media_type === "movie" ? "movie" : "tv";
  }
  const itemName = item.name ? item.name : item.title;
  const itemPathname = `/${mediaType}/${item.id}-${itemName}`;

  const height = direction === "column" ? "141" : "225";
  const width = direction === "column" ? "94" : "150";

  return (
    <div className={cn('flex', direction === "column" ? "flex-row gap-[10px] card-boxshadow rounded-[5px]" : "flex-col relative")}>
      <Link href={itemPathname} className={`h-[${height}px] w-[${width}px] min-w-[${width}px]`}>
        <Image 
          src={imgSrc} 
          alt={item.name! || item.title!} 
          className={cn('h-full w-full bg-[#dbdbdb]', direction === "column" ? "mediaCard-radius " : "rounded-[8px]")}
          width={width}
          height={height}
          onError={() => setImgSrc(imgSrcAlt)}
        />
      </Link>
      {direction != "column" && (
        <div className="absolute top-[10px] right-[10px] z-[5]">
          <DropdownMenu>
            <DropdownMenuTrigger className='bg-slate-400 hover:bg-teal-500 h-[19px] w-[19px] rounded-full'>
              <Ellipsis className='w-auto h-[19px]' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className='flex items-center gap-2'><Heart className='h-[19px] w-[19px]'/>Favorite</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='flex items-center gap-2'><Bookmark className='h-[19px] w-[19px]'/>Watchlist</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='flex items-center gap-2'><List className='h-[19px] w-[19px]'/>Add to list</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>        
        </div>        
      )}
      <div className={cn(direction === "column" ? "flex flex-col gap-[10px] py-[5px]" : "w-[150px] relative pt-[15px] px-[5px] pb-[10px]")}>
        {direction != "column" && (
          <div className="absolute top-[-27px] w-[40px] h-[40px] rounded-full bg-black">
            <div className="circularProgress" style={circularProgressStyles}>
              <span className="circularProgress-value">{progressValue ? `${progressValue}%` : "NR"}</span>
            </div>
          </div>          
        )}
        <div className={cn("flex flex-col", direction === "column" ? "gap-[2px]" : "gap-[4px]")}>
          <Link href={itemPathname} className='link-black font-bold w-fit leading-tight'>
            {item?.title}
            {item?.name}
          </Link>
          <span className='text-xs text-gray-500'>
            {item?.release_date && getFormattedDate(item?.release_date!, false)}
            {item?.first_air_date && getFormattedDate(item?.first_air_date!, false)}
          </span>          
        </div>
        {direction === "column" && (
          <p className='overflow-txt'>{item?.overview}</p>
        )}
      </div>
    </div>
  )
}

export default MediaCard