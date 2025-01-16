import SeasonMediaCard from '@/components/tvShow/SeasonMediaCard';
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
      <SeasonHeader 
        basePathname={basePathname}
        name={tvShow.name}
        date={tvShow.first_air_date}
        image={tvShow.poster_path}
        bgImg={tvShow.backdrop_path}
        backLinkPathname={basePathname}
        backLinkText='Back to main'
      />
      <section className='container py-4'>
        <article className='flex flex-col gap-[14px]'>
          {tvShow.seasons.map((season) => (
            <SeasonMediaCard key={season.id} season={season} basePathname={basePathname} tvShowName={tvShow.name} />
          ))}          
        </article>
      </section>
    </main>
  )
}

export default SeasonsPage