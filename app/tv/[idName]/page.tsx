import TvShowCast from '@/components/tvShow/TvShowCast';
import TvShowInfo from '@/components/tvShow/TvShowInfo';
import TvShowRecommendations from '@/components/tvShow/TvShowRecommendations';
import TvShowCurrentSeason from '@/components/tvShow/TvShowCurrentSeason';
import { Separator } from '@/components/ui/separator';
import { getTvShowById } from '@/services/tmdb/tvShows';
import React from 'react'
import TvShowReviews from '@/components/tvShow/TvShowReviews';
import MediaImages from '@/components/shared/MediaImages';
import MediaVideos from '@/components/shared/MediaVideos';

interface TvShowPageProps {
  params: {
    idName: string;
  }
}

const tvShowPage = async ({params}: TvShowPageProps) => {
  const id = Number(params.idName.split("-")[0]); 
  const tvShow = await getTvShowById(id);

  const basePathname = `/tv/${params.idName}`;

  return (
    <main>
      <TvShowInfo tvShow={tvShow} />
      <TvShowCast tvShowId={id} basePathname={basePathname} />
      <MediaImages mediaId={id} mediaType="tv" basePathname={basePathname} />
      <MediaVideos mediaId={id} mediaType="tv" mediaTitle={tvShow.name} basePathname={basePathname} />
      <TvShowCurrentSeason tvShow={tvShow} basePathname={basePathname} />
      <TvShowReviews tvShowId={id} />
      <div className="container !py-4">
        <Separator />
      </div>
      <TvShowRecommendations tvShowId={id} />
    </main>
  )
}

export default tvShowPage