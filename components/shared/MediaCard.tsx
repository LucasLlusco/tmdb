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

interface MediaCardProps {
  item: MediaItem
  direction?: "row" | "column" | "grid",
  itemType?: "movie" | "tv",
  itemRef?: (node?: Element | null) => void
}

const MediaCard = ({item, direction, itemType, itemRef}: MediaCardProps) => {
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
    <div ref={itemRef} className={cn('flex', {
      "flex-col relative" : direction === "row" || "grid",
      "flex-row gap-[10px] card-boxshadow rounded-[5px]" : direction === "column"
      })}>
      <Link href={itemPathname} className={cn({
        "h-[141px] w-[94px] min-w-max rounded-l-[5px]" : direction === "column",
        "h-[225px] w-[150px] min-w-max rounded-[8px]" : direction === "row",
        "rounded-t-[8px]" : direction === "grid"
      })}>
        <Image 
          src={imgSrc} 
          alt={item.name! || item.title!} 
          className={cn(' bg-[#dbdbdb]', {
            "rounded-l-[5px] h-full max-w-none" : direction === "column",
            "rounded-[8px] h-full w-full" : direction === "row",
            "rounded-t-[8px] h-full w-full" : direction === "grid"
          })}
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
      <div className={cn({
        "flex flex-col gap-[10px] py-[5px]": direction === "column",
        "relative px-[8px] py-[15px]" : direction === "row",
        "relative px-[8px] py-[15px] h-full rounded-b-[8px] card-boxshadow" : direction === "grid"
        })}>
        {direction != "column" && (
          <div className="absolute top-[-27px] w-[40px] h-[40px] rounded-full bg-black">
            <div className="circularProgress" style={circularProgressStyles}>
              <span className="circularProgress-value">{progressValue ? `${progressValue}%` : "NR"}</span>
            </div>
          </div>          
        )}
        <div className={cn("flex flex-col", {
          "gap-[2px]" : direction === "column",
          "gap-[4px]" : direction === "row" || "grid"
          })}>
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