import { getMovieCreditsById } from '@/services/tmdb/movies'
import React from 'react'
import PersonList from '../shared/PersonList';

interface MovieCastProps {
  movieId: string
}

const MovieCast = async ({movieId}: MovieCastProps) => {
  const movieCredits = await getMovieCreditsById(movieId);

  return (
    <section className='container my-8 px-6'>
      <h3 className='text-xl mb-6'>Top billed cast</h3>
      <PersonList cast={movieCredits.cast} />
    </section>
  )
}

export default MovieCast