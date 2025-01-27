import { getTvShowCreditsById } from '@/services/tmdb/tvShows';
import React from 'react'
import PersonList from '../shared/PersonList';

interface TvShowCastProps {
  tvShowId: string
}

const TvShowCast = async ({tvShowId}: TvShowCastProps) => {
  const tvShowCredits = await getTvShowCreditsById(tvShowId);  

  return (
    <section className='container'>
      <h3 className='section-title'>Top billed cast</h3>
      <PersonList cast={tvShowCredits.cast} />
    </section>
  )
}

export default TvShowCast