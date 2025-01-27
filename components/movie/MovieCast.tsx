import { getMovieCreditsById } from '@/services/tmdb/movies'
import React from 'react'
import PersonList from '../shared/PersonList';

interface MovieCastProps {
  movieId: string
}

const MovieCast = async ({movieId}: MovieCastProps) => {
  const movieCredits = await getMovieCreditsById(movieId);

  return (
    <section className='container'>
      <h3 className='section-title'>Top billed cast</h3>
      <PersonList cast={movieCredits.cast} />
    </section>
  )
}

export default MovieCast