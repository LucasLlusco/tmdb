import React from 'react'
import MediaCard from './MediaCard'
import { cn } from '@/lib/utils'

const MediaList = ({items, direction}:MediaListProps) => {
  return (
    <article className={cn(`flex gap-[10px]`, 
      direction === "column" ? "flex-col" : "flex-row overflow-x-scroll",
    )}>
      {items.map((item:MediaItem) => (
        <MediaCard key={item.id} item={item} direction={direction}  />   
      ))}
    </article>
  )
}

export default MediaList