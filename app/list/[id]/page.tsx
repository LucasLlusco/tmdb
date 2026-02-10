import ListContainer from '@/components/user/lists/ListContainer';
import { getListDocument } from '@/lib/actions/user.actions';
import React from 'react'

interface ListPageProps {
  params: {
    id: string
  }
}

const ListPage = async ({params}: ListPageProps) => {
  const listId = params.id;
  const list = await getListDocument(listId);
  
  return (
    <ListContainer initialList={list} listId={list.$id} />
  )
}

export default ListPage
