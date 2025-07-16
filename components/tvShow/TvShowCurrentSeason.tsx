import Link from 'next/link'
import React from 'react'
import SeasonMediaCard from './SeasonMediaCard'
import { isDatePassed } from '@/lib/utils'

interface TvShowCurrentSeasonProps {
  tvShow: TvShow,
  basePathname: string
}

const TvShowCurrentSeason = ({tvShow, basePathname}: TvShowCurrentSeasonProps) => {
  const lastSeasonNumber = tvShow.seasons.length -1;
  let lastSeason =  tvShow.seasons[lastSeasonNumber];

  if(!isDatePassed(lastSeason.air_date)) {
    lastSeason = tvShow.seasons[lastSeasonNumber -1];
  }
  
  const isLastSeason = tvShow.status === "Ended" ? true : false;

  return (
    <section className='container'>
      <h3 className='section-title'>
        {isLastSeason ? "Last Season" : "Current Season"}
      </h3>
      <SeasonMediaCard season={lastSeason} basePathname={basePathname} tvShowName={tvShow.name} />
      <p className="mt-6">
        <Link href={`${basePathname}/seasons`} className='link-black'>
          View All Seasons
        </Link>
      </p>
    </section>
  )
}

export default TvShowCurrentSeason