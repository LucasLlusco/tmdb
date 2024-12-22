import MovieInfo from '@/components/movie/MovieInfo';
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
      <section>CAST</section>
      <section>MEDIA</section>
      <section>RELATED</section>
    </main>
  )
}

export default MoviePage