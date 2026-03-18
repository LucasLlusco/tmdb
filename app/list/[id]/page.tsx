import ListContainer from '@/components/user/lists/ListContainer';
import { getList } from '@/lib/actions/user.actions';
import React from 'react'

interface ListPageProps {
  params: {
    id: string
  }
}

const ListPage = async ({params}: ListPageProps) => {
  const listId = params.id;
  const list = await getList(listId);
  
  return (
    <ListContainer initialList={list} listId={list.$id} />
  )
}

export default ListPage
