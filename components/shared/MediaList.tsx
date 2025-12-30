"use client"
import React from 'react'
import MediaCard from './MediaCard'
import { cn } from '@/lib/utils'
import { useAuthContext } from '@/lib/providers/AuthContextProvider'

interface MediaListProps {
  items: MediaItem[] | []
  direction?: "row" | "column" | "grid" | "grid-xl"
  itemType?: "movie" | "tv"
  itemRef?: (node?: Element | null) => void //for infinite scroll
  itemsType?: ("movie" | "tv")[] //for list items.
}

const MediaList = ({items, direction, itemType, itemRef, itemsType}:MediaListProps) => {
  const { user } = useAuthContext();

  return (
    <article className={cn({
      "flex flex-row overflow-x-scroll gap-[10px]" : direction === "row",
      "flex flex-col gap-5" : direction === "column",
      "grid grid-cols-5 gap-5" : direction === "grid",
      "grid grid-cols-6 gap-5" : direction === "grid-xl",
    })}>
      {items.map((item, index) => {
        if(items.length === index + 1 && itemRef) {
          return <MediaCard 
            key={item.id} 
            item={item} 
            direction={direction} 
            itemType={itemsType ? itemsType[index] : itemType} 
            itemRef={itemRef} 
            user={user} 
          />
        }
        return <MediaCard 
          key={item.id} 
          item={item} 
          direction={direction} 
          itemType={itemsType ? itemsType[index] : itemType} 
          user={user} 
        />
      })}
    </article>
  )
}

export default MediaList