import React from 'react'
import { getListDocuments, getUserDocument } from '@/lib/actions/user.actions'
import ListsContainer from '@/components/user/lists/ListsContainer'

interface ListsPageProps {
  params: {
    id: string
  }
}

const ListsPage = async ({params} : ListsPageProps) => {
  const userId = params.id;

  const userProfile = await getUserDocument(userId);
  const lists = await getListDocuments(userId);

  return (
    <ListsContainer initialLists={lists} userId={userProfile.userId} />
  )
}

export default ListsPage