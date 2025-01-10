import TvShowCast from '@/components/tvShow/TvShowCast';
import TvShowInfo from '@/components/tvShow/TvShowInfo';
import TvShowMedia from '@/components/tvShow/TvShowMedia';
import TvShowRecommendations from '@/components/tvShow/TvShowRecommendations';
import TvShowSeason from '@/components/tvShow/TvShowSeason';
import { Separator } from '@/components/ui/separator';
import { getTvShowById } from '@/services/tmdb/tvShows';
import React from 'react'

interface tvShowPageProps {
  params: {
    idName: string
  } 
}

const tvShowPage = async ({params}: tvShowPageProps) => {
  const id = params.idName.split("-")[0]; 
  const tvShow: TvShow = await getTvShowById(id);

  const basePathname = `/tv/${params.idName}`;

  return (
    <main>
      <TvShowInfo tvShow={tvShow} />
      <TvShowCast tvShowId={id} />
      <TvShowMedia tvShowId={id} />
      <TvShowSeason tvShow={tvShow} basePathname={basePathname} />
      <div className="container my-8 px-6">
        <Separator />
      </div>
      <TvShowRecommendations tvShowId={id} />
    </main>
  )
}

export default tvShowPage