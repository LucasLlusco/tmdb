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
  const id = Number(params.idName.split("-")[0]); 
  const tvShow = await getTvShowById(id);

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
      <section className='container text-[14px] !py-4'>
        <h3 className='section-title !mb-1'>Overview</h3>
        <p>{tvShow.overview}</p>
      </section>
      <section className='container'>
        <h3 className='section-title'>Seasons <span className='font-normal'>{tvShow.number_of_seasons}</span></h3>
        <article className='flex flex-col gap-5'>
          {tvShow.seasons.map((season) => (
            <SeasonMediaCard key={season.id} season={season} basePathname={basePathname} tvShowName={tvShow.name} />
          ))}          
        </article>
      </section>
    </main>
  )
}

export default SeasonsPage