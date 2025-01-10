import Link from 'next/link'
import React from 'react'
import SeasonCard from './SeasonCard'
import { isDatePassed } from '@/lib/utils'

interface TvShowSeasonProps {
  tvShow: TvShow,
  basePathname: string
}

const TvShowSeason = ({tvShow, basePathname}: TvShowSeasonProps) => {
  const lastSeasonNumber = tvShow.seasons.length -1;
  let lastSeason =  tvShow.seasons[lastSeasonNumber];

  if(!isDatePassed(lastSeason.air_date)) {
    lastSeason = tvShow.seasons[lastSeasonNumber -1];
  }
  
  const isLastSeason = tvShow.status === "Ended" ? true : false;

  return (
    <section className='container my-8'>
      <h3 className='text-xl mb-6'>
        {isLastSeason ? "Last Season" : "Current Season"}
      </h3>
      <SeasonCard season={lastSeason} basePathname={basePathname} tvShowName={tvShow.name} />
      <p className="mt-6">
        <Link href={`${basePathname}/seasons`} className='link-black'>
          View All Seasons
        </Link>        
      </p>
    </section>
  )
}

export default TvShowSeason