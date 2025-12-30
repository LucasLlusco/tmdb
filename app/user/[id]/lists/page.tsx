import React from 'react'
import { getListDocuments, getUserDocument } from '@/lib/actions/user.actions'
import { getLoggedInUser } from '@/lib/actions/auth.actions'
import CreateListForm from '@/components/user/lists/CreateListForm'
import ListsContainer from '@/components/user/lists/ListsContainer'

interface ListsPageProps {
  params: {
    id: string
  }
}

const ListsPage = async ({params} : ListsPageProps) => {
  const userId = params.id;

  const user = await getLoggedInUser();
  const userProfile = await getUserDocument(userId);
  const lists = await getListDocuments(userId);

  const isOwner = user?.userId === userProfile.userId;

  return (
    <main>
      <section className='container'>
        <div className="flex justify-between items-center mb-6">
          <h3 className='section-title !mb-0'>{isOwner ? "Your lists" : "Lists"}</h3>
          {isOwner && <CreateListForm userId={userId} />}
        </div>
        <ListsContainer initialData={lists} isOwner={isOwner} userId={userId} />
      </section>
    </main>
  )
}

export default ListsPage