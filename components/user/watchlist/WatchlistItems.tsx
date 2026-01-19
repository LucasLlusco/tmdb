"use client"
import React from 'react'
import MediaList from '@/components/shared/MediaList';
import { getMediaItemsDetails } from '@/lib/actions/user.actions';
import { useQuery } from '@tanstack/react-query';

interface WatchlistItemsProps {
  items: number[]
  itemsType: ("movie" | "tv")[]
}

const WatchlistItems = ({items, itemsType}: WatchlistItemsProps) => {

  const { data, status,  } = useQuery({
    queryKey: ["watchlist-items", items],
    queryFn: () => getMediaItemsDetails(items, itemsType),
    enabled: !!items.length,
    placeholderData: (prevData) => prevData
  });

  if(items.length === 0) return <p>This watchlist is empty</p>;
  if(status === "pending") return <p>Loading items...</p>;
  if(status === "error") return <p>Error loading items</p>;

  const mediaItems = data.map((item: any, index:number) => ({
    ...item,
    media_type: itemsType[index]
  }));  

  return (
    <MediaList items={mediaItems} direction="grid-xl" />
  )
}

export default WatchlistItems