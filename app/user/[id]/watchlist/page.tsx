import WatchlistContainer from '@/components/user/watchlist/WatchlistContainer';
import { getWatchlist } from '@/lib/actions/user.actions';
import React from 'react'

interface WatchlistPageProps {
  params: {
    id: string;
  }
}

const WatchListPage = async ({params}: WatchlistPageProps) => {
  const userId = params.id;
  const watchlist = await getWatchlist(userId);

  return (
    <WatchlistContainer initialWatchlist={watchlist} userId={userId} />
  )
}

export default WatchListPage