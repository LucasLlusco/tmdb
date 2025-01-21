import SeasonHeader from '@/components/tvShow/SeasonHeader';
import SeasonMediaCard from '@/components/tvShow/SeasonMediaCard';
import SeasonPagination from '@/components/tvShow/SeasonPagination';
import { Separator } from '@/components/ui/separator';
import { getFormattedDate, isDatePassed } from '@/lib/utils';
import { getTvShowById, getTvShowSeasonById } from '@/services/tmdb/tvShows';
import React from 'react'

interface SeasonPageProps {
  params: {
    idName: string,
    seasonNumber: string
  } 
}

const SeasonPage = async({params}: SeasonPageProps) => {
  const id = params.idName.split("-")[0]; 
  const seasonNumber = params.seasonNumber;

  const season: TvShowSeason = await getTvShowSeasonById(id, seasonNumber);
  const tvShow: TvShow = await getTvShowById(id);
 
  const backLinkPathname = `/tv/${params.idName}/seasons`;
  const basePathname = `/tv/${params.idName}`;

  return (
    <main>
      <SeasonHeader 
        name={season.name} 
        date={season.air_date} 
        image={season.poster_path} 
        bgImg={season.poster_path}
        backLinkPathname={backLinkPathname}
        backLinkText='Back to seasons list'
      />
      <div className='container py-4'>
        <SeasonPagination currentSeason={season.season_number} totalSeasons={tvShow.number_of_seasons} basePathname={basePathname} />
        <Separator />
      </div>
      <section className='container py-4 text-[14px]'>
        {!isDatePassed(season.air_date) ? (
          <p>Season {season.season_number} of {tvShow.name} is set to premiere on {getFormattedDate(season.air_date!)}</p>
        ) : (
          <>
            <h3 className='text-xl mb-1 font-bold'>Overview</h3>
            <p>{season.overview}</p>
          </>
        )}
      </section>
      <section className='container py-4'>
        <h3 className='text-xl mb-6 font-bold'>Episodes <span className='font-normal'>{season.episodes.length}</span></h3>
        <article className='flex flex-col gap-[14px]'>
          {season.episodes.map((episode) => (
            <SeasonMediaCard key={episode.id} episode={episode} />
          ))}
        </article>
      </section>
      <div className='container py-4'>
        <SeasonPagination currentSeason={season.season_number} totalSeasons={tvShow.number_of_seasons} basePathname={basePathname} />
      </div>
    </main>
  )
}

export default SeasonPage