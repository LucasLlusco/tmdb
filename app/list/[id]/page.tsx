import ListContainer from '@/components/user/lists/ListContainer';
import { getLoggedInUser } from '@/lib/actions/auth.actions';
import { getListDocument } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import React from 'react'

interface ListPageProps {
  params: {
    id: string
  }
}

const ListPage = async ({params}: ListPageProps) => {
  const listId = params.id;

  const user = await getLoggedInUser();
  const list = await getListDocument(listId);
  
  const isOwner = user?.userId === list.userId;

  if(!isOwner && !list.isPublic) { 
    return redirect(`/user/${list.userId}/lists`);
  }  

  return (
    <ListContainer initialData={list} isOwner={isOwner} listId={listId} />
  )
}

export default ListPage
