import { getMovieRecommendationsById } from '@/services/tmdb/movies'
import React from 'react'
import MediaList from '../shared/MediaList';

interface MovieRecommendationsProps {
  movieId: number
}

const MovieRecommendations = async ({movieId}:MovieRecommendationsProps) => {
  const recommendedMovies = await getMovieRecommendationsById(movieId);

  return (
    <section className='container'>
      <h3 className='section-title'>Recommendations</h3>
      <MediaList
        items={recommendedMovies} 
        direction='row'
      />
    </section>
  )
}

export default MovieRecommendations