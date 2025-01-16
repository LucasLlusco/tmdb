import SeasonHeader from '@/components/tvShow/SeasonHeader';
import SeasonMediaCard from '@/components/tvShow/SeasonMediaCard';
import { getTvShowSeasonById } from '@/services/tmdb/tvShows';
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

  const backLinkPathname = `/tv/${params.idName}/seasons`;  

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
      <section className='container py-4'>
        <article className='flex flex-col gap-[14px]'>
          {season.episodes.map((episode) => (
            <SeasonMediaCard key={episode.id} episode={episode} />
          ))}          
        </article>
      </section>
    </main>
  )
}

export default SeasonPage