"use client"
import { getListDocuments } from '@/lib/actions/user.actions';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import ListCard from './ListCard';

interface ListsContainerProps {
  initialData: ListType[] | []
  isOwner: boolean
  userId: string
}

const ListsContainer = ({initialData, isOwner, userId}: ListsContainerProps) => {

  const { data: lists, isFetching, isError } = useQuery({
    queryKey: ["lists", userId],
    queryFn: () => getListDocuments(userId),
    initialData: initialData
  });

  if (isFetching) return <p>Loading lists...</p>
  if (isError) return <p>Error loading lists</p>;

  return (
    <article className='flex flex-col gap-5'>
      {lists.map((list) => {
        if(isOwner || list.isPublic) return <ListCard key={list.$id} list={list} isOwner={isOwner} />
      })}
    </article>
  )
}

export default ListsContainer