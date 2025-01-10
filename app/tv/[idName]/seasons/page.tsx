import SeasonCard from '@/components/tvShow/SeasonCard';
import SeasonHeader from '@/components/tvShow/SeasonHeader';
import { getTvShowById } from '@/services/tmdb/tvShows';
import React from 'react'

interface SeasonsPageProps {
  params: {
    idName: string
  } 
}

const SeasonsPage = async({params} : SeasonsPageProps) => {
  const id = params.idName.split("-")[0]; 
  const tvShow: TvShow = await getTvShowById(id)

  const basePathname = `/tv/${params.idName}`;

  return (
    <main>
      <SeasonHeader basePathname={basePathname} tvShow={tvShow} />
      <section className='container py-4'>
        <article className='flex flex-col gap-[14px]'>
          {tvShow.seasons.map((season) => (
            <SeasonCard key={season.id} season={season} basePathname={basePathname} tvShowName={tvShow.name} />
          ))}          
        </article>
      </section>
    </main>
  )
}

export default SeasonsPage