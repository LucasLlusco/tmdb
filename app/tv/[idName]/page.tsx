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
import MediaKeywords from '@/components/shared/MediaKeywords';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

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
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-[1fr_250px] gap-5 !pt-0'>
        <div className="main-section">
          <TvShowCast tvShowId={id} basePathname={basePathname} />
          <MediaImages mediaId={id} mediaType="tv" basePathname={basePathname} />
          <MediaVideos mediaId={id} mediaType="tv" mediaTitle={tvShow.name} basePathname={basePathname} />
          <TvShowCurrentSeason tvShow={tvShow} basePathname={basePathname} />
          <TvShowReviews tvShowId={id} />
          <div className="container !py-4 !px-0">
            <Separator />
          </div>
          <TvShowRecommendations tvShowId={id} />          
        </div>
        <aside className="aside-section mt-8">
          <p className="flex gap-2 items-center"><strong>Visit Homepage</strong>
            <a href={tvShow.homepage} className="w-fit" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-5 h-5" />
            </a>
          </p>
          <p>
            <strong className='block'>
              Status
            </strong>
            {tvShow.status}
          </p>
          <p>
            <strong className='block'>
              Original Language
            </strong>
            {tvShow.original_language}
          </p>
          <div>
            <strong className='block mb-[5px]'>Production Companies</strong>
            <div className="flex flex-wrap gap-[5px] justify-start">
              {tvShow.production_companies.map((company) => (
                <Badge key={company.id} variant={"secondary"}>{company.name}</Badge>
              ))}      
            </div>
          </div>
          <div>
            <strong className='block mb-[5px]'>Networks</strong>
            <div className="flex flex-wrap gap-[5px] justify-start">
              {tvShow.networks.map((network) => (
                <Badge key={network.id} variant={"secondary"}>{network.name}</Badge>
              ))}
            </div>
          </div>
          <div>
            <strong className='block mb-[5px]'>Keywords</strong>
            <MediaKeywords mediaId={tvShow.id} mediaType={"tv"} />
          </div>
        </aside>
      </div>
    </main>
  )
}

export default tvShowPage