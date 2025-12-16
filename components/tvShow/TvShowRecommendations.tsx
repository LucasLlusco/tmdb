import { getTvShowRecommendationsById } from '@/services/tmdb/tvShows';
import React from 'react'
import MediaList from '../shared/MediaList';

interface TvShowRecommendationsProps {
  tvShowId: string
}

const TvShowRecommendations = async ({tvShowId}: TvShowRecommendationsProps) => {
  const recommendedTvShows = await getTvShowRecommendationsById(tvShowId);

  return (
    <section className='container'>
      <h3 className='section-title'>Recommendations</h3>
      <MediaList
        items={recommendedTvShows.results}
        direction='row'
      />
    </section>
  )
}

export default TvShowRecommendations