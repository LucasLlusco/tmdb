"use client"
import { getListDocument } from '@/lib/actions/user.actions';
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import ListOwnerAvatar from './ListOwnerAvatar';
import EditListForm from './EditListForm';
import ListItems from './ListItems';

interface ListContainerProps {
  initialData: ListType
  isOwner: boolean
  listId: string
}

const ListContainer = ({initialData, isOwner, listId} : ListContainerProps) => {

  const { data: list, isPending, isError } = useQuery({
    queryKey: ["list", listId],
    queryFn: () => getListDocument(listId),
    initialData: initialData
  });

  if (isPending) return <p>Loading list...</p>;
  if (isError) return <p>Error loading list</p>;

  return (
    <main>
      <section className="bg-[#1f1f1f] text-white">
        <div className='container flex flex-col gap-5'>
          <div className='flex flex-col gap-1'>
            <p className="opacity-70 text-sm">{list.isPublic ? "Public list" : "Private list"}</p>
            <h2 className='text-4xl font-bold'>{list.title}</h2>
            <p className='mt-2'>{list.description}</p>
          </div>
          <ListOwnerAvatar userId={list.userId} list={list} />
          <div>
            {isOwner && <EditListForm list={list} />}
          </div>
        </div>
      </section>
      <section className="container">
        <h3 className='section-title'>{list.items.length} Items</h3>
        <ListItems items={list.items!} itemsType={list.itemsMediaType!} />
      </section>
    </main>
  )
}

export default ListContainer