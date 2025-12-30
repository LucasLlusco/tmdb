"use client"
import React from 'react'
import { getListItemsDetails } from '@/lib/actions/user.actions';
import { useQuery } from '@tanstack/react-query';
import MediaList from '@/components/shared/MediaList';

interface ListItemsProps {
  items: number[]
  itemsType: ("movie" | "tv")[]
}

const ListItems = ({items, itemsType}: ListItemsProps) => {

  const { data, isFetching, isError } = useQuery({
    queryKey: ["list-items", items],
    queryFn: () => getListItemsDetails(items, itemsType),
    enabled: !!items.length
  });

  if(items.length === 0) return <p>This list is empty</p>;
  if(isFetching) return <p>Loading items...</p>;
  if(isError) return <p>Error loading items</p>;

  return (
    <MediaList items={data} direction="grid-xl" itemsType={itemsType} />
  )
}

export default ListItems