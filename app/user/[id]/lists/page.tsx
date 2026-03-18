import React from 'react'
import { getListsByUser } from '@/lib/actions/user.actions'
import ListsContainer from '@/components/user/lists/ListsContainer'

interface ListsPageProps {
  params: {
    id: string;
  }
}

const ListsPage = async ({params} : ListsPageProps) => {
  const userId = params.id;
  const lists = await getListsByUser(userId);

  return (
    <ListsContainer initialLists={lists} userId={userId} />
  )
}

export default ListsPage