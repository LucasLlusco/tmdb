import MediaReviewsContainer from '@/components/shared/MediaReviewsContainer';
import MediaHeader from '@/components/shared/MediaHeader';
import React from 'react'
import { getMovieById } from '@/services/tmdb/movies';

interface MovieReviewsPageProps {
  params: {
    idName: string;
  }
}

const MovieReviewsPage = async ({params} : MovieReviewsPageProps) => {
  const id = Number(params.idName.split("-")[0]); 

  const movie = await getMovieById(id);
  const basePathname = `/movie/${params.idName}`;

  return (
    <main>
      <MediaHeader
        basePathname={basePathname}
        name={movie.title}
        date={movie.release_date}
        image={movie.poster_path}
        bgImg={movie.backdrop_path}
        backLinkPathname={basePathname}
        backLinkText='Back to main'
      />
      <MediaReviewsContainer 
        mediaId={movie.id} 
        mediaType={"tv"} 
        mediaTitle={movie.title} 
        mediaPosterPath={movie.poster_path} 
      />
    </main>
  )
}

export default MovieReviewsPage