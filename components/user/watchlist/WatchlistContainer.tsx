"use client"
import React from 'react'
import WatchlistItems from './WatchlistItems'
import { getWatchlistDocument } from '@/lib/actions/user.actions'
import { useQuery } from '@tanstack/react-query'
import EditWatchlistForm from './EditWatchlistForm'
import { useAuthContext } from '@/lib/providers/AuthContextProvider'

interface WatchlistContainerProps {
  initialWatchlist: WatchlistType | null
  userId: string
}

const WatchlistContainer = ({initialWatchlist, userId} : WatchlistContainerProps) => {
  const { user, isLoading } = useAuthContext();
  const isOwner = user?.userId === userId;

  const { data: watchlist, isPending, isError } = useQuery({
    queryKey: ["watchlist", userId],
    queryFn: () => getWatchlistDocument(userId),
    initialData: initialWatchlist
  });

  if (isPending || isLoading) return <p>Loading watchlist...</p>;
  if (isError) return <p>Error loading watchlist</p>;

  return (
    <main>
      {!isOwner && !watchlist?.isPublic ? (
        <section className='container'>
          <h3 className='section-title'>Private watchlist</h3>
          <p>The owner of this watchlist has not enabled public viewing</p>
        </section>
      ) : (
        <section className='container'>
          <div className="flex justify-between items-center mb-6">
            <h3 className='section-title !mb-0'>{isOwner ? "Your watchlist" : "Watchlist"}</h3>
            {isOwner && <EditWatchlistForm watchlist={watchlist!} userId={userId} />}
          </div>
          <WatchlistItems items={watchlist?.items!} itemsType={watchlist?.itemsMediaType!} />
        </section>
      )}
    </main>
  )
}

export default WatchlistContainer