import { getMovieRecommendationsById } from '@/services/tmdb/movies'
import React from 'react'
import MediaList from '../shared/MediaList';

interface MovieRecommendationsProps {
  movieId: string
}

const MovieRecommendations = async ({movieId}:MovieRecommendationsProps) => {
  const recommendedMovies = await getMovieRecommendationsById(movieId);

  return (
    <section className='container my-8 px-6'>
      <h3 className='text-xl mb-6'>Recommendations</h3>
      <MediaList
        items={recommendedMovies.results} 
      />
    </section>
  )
}

export default MovieRecommendations