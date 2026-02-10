"use client"
import { getListDocument } from '@/lib/actions/user.actions';
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import ListOwnerAvatar from './ListOwnerAvatar';
import EditListForm from './EditListForm';
import ListItems from './ListItems';
import { useAuthContext } from '@/lib/providers/AuthContextProvider';

interface ListContainerProps {
  initialList: ListType
  listId: string
}

const ListContainer = ({initialList, listId} : ListContainerProps) => {
  const { user, isLoading} = useAuthContext();

  const { data: list, isPending, isError } = useQuery({
    queryKey: ["list", listId],
    queryFn: () => getListDocument(listId),
    initialData: initialList,
  });

  if (isPending || isLoading) return <p>Loading list...</p>;
  if (isError) return <p>Error loading list</p>;

  const isOwner = user?.userId === list.userId;

  return (
    <main>
      {!isOwner && !list.isPublic ? (
        <section className='container'>
          <h3 className='section-title'>Private list</h3>
          <p>The creator of this list has not enabled public viewing</p>
        </section>
      ) : (
        <>
        <section className="bg-[#1f1f1f] text-white">
          <div className='container flex flex-col gap-5'>
            <div className='flex flex-col gap-1'>
              <p className="opacity-70 text-sm">{list.isPublic ? "Public list" : "Private list"}</p>
              <h2 className='text-4xl font-bold'>{list.title}</h2>
              <p className='mt-2'>{list.description}</p>
            </div>
            <ListOwnerAvatar list={list} user={user} isOwner={isOwner} />
            <div>
              {isOwner && <EditListForm list={list} />}
            </div>
          </div>
        </section>
        <section className="container">
          <h3 className='section-title'>{list.items.length} Items</h3>
          <ListItems items={list.items!} itemsType={list.itemsMediaType!} />
        </section>
        </>
      )}
    </main>
  )
}

export default ListContainer