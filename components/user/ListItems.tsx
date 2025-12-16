"use client"
import React from 'react'
import { getListItemsDetails } from '@/lib/actions/user.actions';
import { useQuery } from '@tanstack/react-query';
import MediaList from '../shared/MediaList';

interface ListItemsProps {
  items: number[]
  itemsType: ("movie" | "tv")[]
}

const ListItems = ({items, itemsType}: ListItemsProps) => {

  if(items.length === 0) return <p>This list is empty</p>;

  const { data, status } = useQuery({
    queryKey: ["list-items", items],
    queryFn: () => getListItemsDetails(items, itemsType),
  });

  if (status === "pending") return <p>Loading items...</p>;
  if (status === "error") return <p>Error loading items</p>;

  return (
    <MediaList items={data} direction="column" itemsType={itemsType} />
  )
}

export default ListItems