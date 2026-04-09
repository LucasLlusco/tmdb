import MovieCast from '@/components/movie/MovieCast';
import MovieInfo from '@/components/movie/MovieInfo';
import MovieRecommendations from '@/components/movie/MovieRecommendations';
import MovieReviews from '@/components/movie/MovieReviews';
import MediaImages from '@/components/shared/MediaImages';
import MediaVideos from '@/components/shared/MediaVideos';
import { Separator } from '@/components/ui/separator';
import { getMovieById } from '@/services/tmdb/movies';
import React from 'react'

interface moviePageProps {
  params: {
    idName: string;
  } 
}

const MoviePage = async ({params}: moviePageProps) => {
  const id = Number(params.idName.split("-")[0]); 
  const movie = await getMovieById(id);

  const basePathname = `/movie/${params.idName}`;

  return (
    <main>
      <MovieInfo movie={movie} />
      <MovieCast movieId={id} basePathname={basePathname} />
      <MediaImages mediaId={id} mediaType="movie" basePathname={basePathname} />
      <MediaVideos mediaId={id} mediaType="movie" mediaTitle={movie.title} basePathname={basePathname} />
      <MovieReviews movieId={id} />
      <div className="container !py-4">
        <Separator />
      </div>
      <MovieRecommendations movieId={id} />
    </main>
  )
}

export default MoviePage