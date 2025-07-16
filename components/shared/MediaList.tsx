import React from 'react'
import MediaCard from './MediaCard'
import { cn } from '@/lib/utils'

interface MediaListProps {
  items: MediaItem[] | []
  direction?: "row" | "column" | "grid"
  itemType?: "movie" | "tv"
  itemRef?: (node?: Element | null) => void
}

const MediaList = ({items, direction, itemType, itemRef}:MediaListProps) => {

  return (
    <article className={cn({
      "flex flex-row overflow-x-scroll gap-[10px]" : direction === "row",
      "flex flex-col gap-5" : direction === "column",
      "grid grid-cols-5 gap-5" : direction === "grid"
    })}>
      {items.map((item:MediaItem, index) => {
        if(items.length === index + 1 && itemRef) {
          return <MediaCard key={item.id} item={item} direction={direction} itemType={itemType} itemRef={itemRef} />
        }
        return <MediaCard key={item.id} item={item} direction={direction} itemType={itemType} />
      })}
    </article>
  )
}

export default MediaList