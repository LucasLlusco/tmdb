import MovieCast from '@/components/movie/MovieCast';
import MovieInfo from '@/components/movie/MovieInfo';
import MovieMedia from '@/components/movie/MovieMedia';
import { getMovieById } from '@/services/tmdb/movies';
import React from 'react'

interface moviePageProps {
  params: {
    idName: string
  } 
}

const MoviePage = async ({params}: moviePageProps) => {
  const id = params.idName.split("-")[0]; 
  const movie: Movie = await getMovieById(id);

  return (
    <main>
      <MovieInfo movie={movie} />
      <MovieCast movieId={id} />
      <MovieMedia movieId={id} />
      <section>RELATED</section>
    </main>
  )
}

export default MoviePage