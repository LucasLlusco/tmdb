"use client"
import { getFormattedDate } from '@/lib/utils';
import React from 'react'
import ImageWithFallback from '../shared/ImageWithFallback';
import { CommandItem } from '../ui/command';
import { useRouter } from 'next/router';

interface SearchResultCardProps {
  item: MediaItem;
  setOpen: (value: React.SetStateAction<boolean>) => void;
}

const SearchResultCard = ({ item, setOpen} : SearchResultCardProps) => {
  const router = useRouter();
  const title = item.media_type === "movie" ? item.title : item.name;
  const date = item.media_type === "movie" ? item.release_date : item.first_air_date;
  const itemPathname = `/${item.media_type}/${item.id}-${title}`;
  
  const handleSelect = () => {
    setOpen(false);
    router.push(itemPathname);
  }

  return (
    <CommandItem 
      className="self-stretch block cursor-pointer hover:bg-accent hover:text-accent-foreground py-[5px] px-[10px] [&_>_:last-child]:hidden"
      onSelect={handleSelect}
      >
      <div className="flex flex-row items-center gap-[10px]">
        <ImageWithFallback
          src={item.poster_path} 
          alt={title} 
          className={"rounded-[5px] h-full max-w-none bg-[#dbdbdb]"}
          width={54}
          height={80}
        />
        <div className="flex flex-col">
          <p className="text-sm">{title}</p>
          <p className="text-gray-500 text-xs">{date && getFormattedDate(date, false)}</p>
        </div>
      </div>
    </CommandItem>
  )
}

export default SearchResultCard