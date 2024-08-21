import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bookmark, Ellipsis, Heart, List } from 'lucide-react'
import { formatDate, formatUserScore, formatUserScoreColor } from '@/lib/utils'


const ItemCard = ({item}: ItemCardProps) => {

  const progressValue = formatUserScore(item?.vote_average);
  const progresscolor = formatUserScoreColor(formatUserScore(item?.vote_average));
  const circularProgressStyles = {
    background: `conic-gradient(${progresscolor.bar} ${progressValue * 3.6}deg, ${progresscolor.track} 0deg)`,
  }
  return (
    <div className='flex flex-col relative'>
      <Link href={"/"} className='h-[225px] w-[150px]'>
        <Image 
          src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} 
          alt={item.name! || item.title!} 
          className='h-full w-full rounded-[8px]'
          width={150}
          height={225} 
        />
      </Link>
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
      <div className='relative pt-[15px] px-[5px] pb-[10px] w-[150px]'>
        <div className="absolute top-[-27px] w-[40px] h-[40px] rounded-full bg-black">
          <div className="circularProgress" style={circularProgressStyles}>
            <span className="circularProgress-value">{progressValue ? `${progressValue}%` : "NR"}</span>
          </div>
        </div>
        <p className='text-base font-bold'>
          {item?.title}
          {item?.name}
        </p>
        <span className='text-xs'>
          {item?.release_date && formatDate(item?.release_date!)}
          {item?.first_air_date && formatDate(item?.first_air_date!) }
        </span>
      </div>
    </div>
  )
}

export default ItemCard
