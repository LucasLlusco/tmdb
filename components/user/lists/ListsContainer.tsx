"use client"
import { getListDocuments } from '@/lib/actions/user.actions';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import ListCard from './ListCard';
import { useAuthContext } from '@/lib/providers/AuthContextProvider';
import CreateListForm from './CreateListForm';

interface ListsContainerProps {
  initialLists: ListType[] | []
  userId: string
}

const ListsContainer = ({initialLists, userId}: ListsContainerProps) => {
  const { user, isLoading } = useAuthContext();

  const { data: lists, isPending, isError } = useQuery({
    queryKey: ["lists", userId],
    queryFn: () => getListDocuments(userId),
    initialData: initialLists,
  });

  if (isPending || isLoading) return <p>Loading lists...</p>; 
  if (isError) return <p>Error loading lists</p>;

  const isOwner = user?.userId === userId;

  return (
    <main>
      <section className='container'>
        <div className="flex justify-between items-center mb-6">
          <h3 className='section-title !mb-0'>{isOwner ? "Your lists" : "Lists"}</h3>
          {isOwner && <CreateListForm userId={userId} />}
        </div>
        <article className='flex flex-col gap-5'>
          {lists.length > 0 ? (
            <>
            {lists.map((list) => {
              if(isOwner || list.isPublic) return <ListCard key={list.$id} list={list} isOwner={isOwner} />
            })}
            </>
          ) : (
            <p>{isOwner ? "You haven't created any lists yet" : "No lists have been created yet"}</p>
          )}
        </article>
      </section>
    </main>
  )
}

export default ListsContainer