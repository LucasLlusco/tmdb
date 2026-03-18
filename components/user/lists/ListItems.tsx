"use client"
import React from 'react'
import { getMediaItemsDetails } from '@/lib/actions/user.actions';
import { useQuery } from '@tanstack/react-query';
import MediaList from '@/components/shared/MediaList';

interface ListItemsProps {
  mediaIds: number[];
  mediaTypes: ("movie" | "tv")[];
}

const ListItems = ({mediaIds, mediaTypes}: ListItemsProps) => {

  const { data, status } = useQuery({
    queryKey: ["list-items", mediaIds],
    queryFn: () => getMediaItemsDetails(mediaIds, mediaTypes),
    enabled: !!mediaIds.length,
    placeholderData: (prevData) => prevData
  });

  if(mediaIds.length === 0) return <p>This list is empty</p>;
  if(status === "pending") return <p>Loading items...</p>;
  if(status === "error") return <p>Error loading items</p>;

  return (
    <MediaList items={data} direction="grid-xl" />
  )
}

export default ListItems