import MediaReviewsContainer from '@/components/shared/MediaReviewsContainer';
import MediaHeader from '@/components/shared/MediaHeader';
import { getTvShowById } from '@/services/tmdb/tvShows';
import React from 'react'

interface TvShowReviewsPageProps {
  params: {
    idName: string;
  }
}

const TvShowReviewsPage = async ({params} : TvShowReviewsPageProps) => {
  const id = Number(params.idName.split("-")[0]); 

  const tvShow = await getTvShowById(id);
  const basePathname = `/tv/${params.idName}`;

  return (
    <main>
      <MediaHeader
        basePathname={basePathname}
        name={tvShow.name}
        date={tvShow.first_air_date}
        image={tvShow.poster_path}
        bgImg={tvShow.backdrop_path}
        backLinkPathname={basePathname}
        backLinkText='Back to main'
      />
      <MediaReviewsContainer 
        mediaId={tvShow.id} 
        mediaType={"tv"} 
        mediaTitle={tvShow.name} 
        mediaPosterPath={tvShow.poster_path} 
      />
    </main>
  )
}

export default TvShowReviewsPage