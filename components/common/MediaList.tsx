import React from 'react'
import MediaCard from './MediaCard'


const MediaList = ({items}:MediaListProps) => {
  return (
    <article className='flex flex-row gap-[10px] overflow-x-scroll'>
      {items.map((item:MediaItem) => (
        <MediaCard key={item.id} item={item}  />   
      ))}
    </article>
  )
}

export default MediaList