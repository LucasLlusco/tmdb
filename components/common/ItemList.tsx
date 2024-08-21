import React from 'react'
import ItemCard from './ItemCard'

const ItemList = ({items}:ItemListProps) => {
  return (
    <article className='flex flex-row gap-[10px] overflow-x-scroll'>
      {items.map((item:MediaItem) => (
        <ItemCard key={item.id} item={item}  />   
      ))}
    </article>
  )
}

export default ItemList