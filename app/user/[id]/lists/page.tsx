"use client"
import React from 'react'
import CreateListForm from '@/components/user/CreateListForm'
import ListCard from '@/components/user/ListCard'
import { getListDocuments } from '@/lib/actions/user.actions'
import { useQuery } from '@tanstack/react-query'
import { useAuthContext } from '@/lib/providers/AuthContextProvider'

interface ListsPageProps {
  params: {
    id: string
  }
}

const ListsPage = ({params} : ListsPageProps) => {
  const userId = params.id;
  const { user } = useAuthContext();

  const { data, status } = useQuery({
    queryKey: ["lists", userId],
    queryFn: () => getListDocuments(userId)
  });

  if (status === "pending") return <p>Loading lists...</p>;
  if (status === "error") return <p>Error loading lists</p>;

  const isOwner = user?.userId === userId;

  return (
    <main>
      <section className='container'>
        <div className="flex justify-between items-center mb-6">
          <h3 className='section-title !mb-0'> {isOwner ? "Your lists" : "Lists"}</h3>
          {isOwner && <CreateListForm userId={userId} />}
        </div>
        <article className='flex flex-col gap-5'>
          {data.map((list) => {
            if(isOwner || list.isPublic) return <ListCard key={list.$id} list={list} isOwner={isOwner} />
          })}
        </article>
      </section>
    </main>
  )
}

export default ListsPage