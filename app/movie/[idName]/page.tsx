import MovieCast from '@/components/movie/MovieCast';
import MovieInfo from '@/components/movie/MovieInfo';
import MovieMedia from '@/components/movie/MovieMedia';
import MovieRecommendations from '@/components/movie/MovieRecommendations';
import { Separator } from '@/components/ui/separator';
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
      <div className="container my-8 px-6">
        <Separator />
      </div>
      <MovieRecommendations movieId={id} />
    </main>
  )
}

export default MoviePage