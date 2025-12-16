"use client"
import React from 'react'
import ListItems from '@/components/user/ListItems';
import { getListDocument } from '@/lib/actions/user.actions';
import { getFormattedDate } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '@/lib/providers/AuthContextProvider';
import { useRouter } from 'next/navigation';
import EditListForm from '@/components/user/EditListForm';

interface ListPageProps {
  params: {
    listId: string
    id: string
  }
}

const ListPage = ({params} : ListPageProps) => {
  const route = useRouter();
  const listId = params.listId;
  const userId = params.id;

  const { user } = useAuthContext();

  const isOwner = user?.userId === userId;
  
  const { data: list, status } = useQuery({
    queryKey: ["list", listId],
    queryFn: () => getListDocument(listId)
  });

  if (status === "pending") return <p>Loading list...</p>;
  if (status === "error") return <p>Error loading list</p>;

  if(!isOwner && !list.isPublic) {
    return route.push(`/user/${userId}/lists`);
  }

  return (
    <main className='container flex flex-row gap-5'>
      <aside className="aside-section">
        <div className="aside-box card-boxshadow flex flex-col text-sm">
          <h2 className='section-title !mb-1'>{list.title}</h2>
          <p>{list.items?.length} items</p>
          <p>{list.isPublic ? "Public" : "Private"}</p>
          <p>Created at {getFormattedDate(list.$createdAt)}</p>
          <p className='mb-4'>Modified at {getFormattedDate(list.$updatedAt)}</p>
          <EditListForm listId={listId} title={list.title} isPublic={list.isPublic} />
        </div>
      </aside>
      <section className="main-section">
        <ListItems items={list.items!} itemsType={list.itemsMediaType!} />
      </section>        
    </main>
  )
}

export default ListPage