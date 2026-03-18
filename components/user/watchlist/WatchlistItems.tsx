"use client"
import React from 'react'
import MediaList from '@/components/shared/MediaList';
import { getMediaItemsDetails } from '@/lib/actions/user.actions';
import { useQuery } from '@tanstack/react-query';

interface WatchlistItemsProps {
  mediaIds: number[];
  mediaTypes: ("movie" | "tv")[];
}

const WatchlistItems = ({mediaIds, mediaTypes}: WatchlistItemsProps) => {

  const { data, status } = useQuery({
    queryKey: ["watchlist-items", mediaIds],
    queryFn: () => getMediaItemsDetails(mediaIds, mediaTypes),
    enabled: !!mediaIds.length,
    placeholderData: (prevData) => prevData
  });

  if(mediaIds.length === 0) return <p>This watchlist is empty</p>;
  if(status === "pending") return <p>Loading items...</p>;
  if(status === "error") return <p>Error loading items</p>;

  return (
    <MediaList items={data} direction="grid-xl" />
  )
}

export default WatchlistItems