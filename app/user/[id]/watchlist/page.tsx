import WatchlistContainer from '@/components/user/watchlist/WatchlistContainer';
import { getUserDocument, getWatchlistDocument } from '@/lib/actions/user.actions';
import React from 'react'

interface WatchlistPageProps {
  params: {
    id: string
  }
}

const WatchListPage = async ({params}: WatchlistPageProps) => {
  const userId = params.id;

  const userProfile = await getUserDocument(userId);
  const watchlist = await getWatchlistDocument(userId);

  return (
    <WatchlistContainer initialWatchlist={watchlist} userId={userProfile.userId} />
  )
}

export default WatchListPage