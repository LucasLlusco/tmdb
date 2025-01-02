import { getTvShowRecommendationsById } from '@/services/tmdb/tvShows';
import React from 'react'
import MediaList from '../shared/MediaList';

interface TvShowRecommendationsProps {
  tvShowId: string
}

const TvShowRecommendations = async ({tvShowId}: TvShowRecommendationsProps) => {
  const recommendedTvShows = await getTvShowRecommendationsById(tvShowId);

  return (
    <section className='container my-8 px-6'>
      <h3 className='text-xl mb-6'>Recommendations</h3>
      <MediaList
        items={recommendedTvShows.results} 
      />
    </section>
  )
}

export default TvShowRecommendations