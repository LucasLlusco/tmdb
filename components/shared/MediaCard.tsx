"use client"
import Link from 'next/link'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis, Heart, List } from 'lucide-react'
import { cn, getFormattedDate } from '@/lib/utils'
import AddListItemForm from '../user/lists/AddListItemForm'
import AddWatchlistItemForm from '../user/watchlist/AddWatchlistItemForm'
import UserScoreProgress from './UserScoreProgress'
import ImageWithFallback from './ImageWithFallback'

interface MediaCardProps {
  item: MediaItem
  direction: "row" | "column" | "grid" | "grid-xl"
  itemRef?: (node?: Element | null) => void
  user: UserType | null
}

const MediaCard = ({item, direction, itemRef, user}: MediaCardProps) => {
  const type = item.media_type;
  const title = item.media_type === "movie" ? item.title : item.name;
  const date = item.media_type === "movie" ? item.release_date : item.first_air_date;
  const itemPathname = `/${type}/${item.id}-${title}`;

  const height = direction === "column" ? 141 : 225;
  const width = direction === "column" ? 94 : 150;

  return (
    <div ref={itemRef} className={cn('flex relative', {
      "flex-col" : direction === "row" || direction === "grid" || direction ===  "grid-xl",
      "flex-row gap-[10px] card-boxshadow rounded-[5px]" : direction === "column"
      })}>
      <Link href={itemPathname} className={cn({
        "h-[141px] w-[94px] min-w-max rounded-l-[5px]" : direction === "column",
        "h-[225px] w-[150px] min-w-max rounded-[8px]" : direction === "row",
        "rounded-t-[8px]" : direction === "grid" || direction === "grid-xl"
      })}>
        <ImageWithFallback
          src={item.poster_path} 
          alt={title} 
          className={cn(' bg-[#dbdbdb]', {
            "rounded-l-[5px] h-full max-w-none" : direction === "column",
            "rounded-[8px] h-full w-full" : direction === "row",
            "rounded-t-[8px] h-full w-full" : direction === "grid" || direction === "grid-xl"
          })}
          width={width}
          height={height}
        />
      </Link>
      <div className="absolute top-[10px] right-[10px] z-[5]">
        <DropdownMenu>
          <DropdownMenuTrigger className='bg-slate-400 hover:bg-teal-500 h-[19px] w-[19px] rounded-full'>
            <Ellipsis className='w-auto h-[19px]' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {user? (
              <div className='flex flex-col'>
                <DropdownMenuItem><Heart className='w-4 h-4 mr-2' />Add to favorites</DropdownMenuItem>
                <DropdownMenuSeparator />
                <AddWatchlistItemForm userId={user?.$id} itemId={item.id} itemTitle={title} itemType={type} isInDropDown={true} />
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger><List className='w-4 h-4 mr-2' />Add to list</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <AddListItemForm userId={user?.$id!} itemId={item.id} itemTitle={title} itemType={type} isInDropDown={true} />
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </div>
            ) : (
              <>
                <DropdownMenuLabel>Want to rate or add this item to a list?</DropdownMenuLabel>
                <DropdownMenuItem><Link href={"/login"} className='w-full'>Login</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Don't have an account yet?</DropdownMenuLabel>
                <DropdownMenuItem><Link href={"/signup"} className='w-full'>Sign up</Link></DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className={cn({
        "flex flex-col gap-[10px] py-[5px]" : direction === "column",
        "relative px-[8px] py-[15px]" : direction === "row",
        "relative px-[8px] py-[15px] h-full rounded-b-[8px] card-boxshadow" : direction === "grid" || direction === "grid-xl"
        })}>
        {direction != "column" && (
          <UserScoreProgress vote_average={item.vote_average} absolute={true} />
        )}
        <div className={cn("flex flex-col", {
          "gap-[2px]" : direction === "column",
          "gap-[4px]" : direction === "row" || direction === "grid" || direction === "grid-xl"
          })}>
          <Link href={itemPathname} className='link-black font-bold w-fit leading-tight'>
            {title}
          </Link>
          <span className='text-xs text-gray-500'>
            {date && getFormattedDate(date, false)}
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