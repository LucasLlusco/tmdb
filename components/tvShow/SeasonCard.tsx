import { getFormattedDate, getUserScore, getYear, isDatePassed } from '@/lib/utils'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface SeasonCardProps {
  season: TvShowSeason,
  basePathname: string,
  tvShowName: string
}

const SeasonCard = ({season, basePathname, tvShowName}: SeasonCardProps) => {
  const seasonPathname = `${basePathname}/season/${season.season_number} `;

  return (
    <div className='flex flex-row gap-[10px] card-boxshadow rounded-[5px]'>
      <Link href={seasonPathname} className="h-[141px] w-[94px] min-w-[94px]">
        <Image 
          src={`https://image.tmdb.org/t/p/w500/${season.poster_path}`} 
          alt={season.name} 
          className={"mediaCard-radius"}
          width={94}
          height={141} 
        />
      </Link>   
      <div className={"flex flex-col py-[5px]"}>
        <p className='text-base font-bold'>
          <Link href={seasonPathname} className='link-black'>
            {season?.name}
          </Link>
        </p>
        <div className="flex gap-2 items-center">
          {isDatePassed(season.air_date) && (
            <span className='bg-slate-800 text-white text-xs px-[5px] py-[5px] rounded-[5px] font-bold flex items-center gap-[5px]'>
              <StarIcon className={"w-[17px] h-[17px]"} />
              <span>{getUserScore(season.vote_average)}%</span>
            </span>            
          )}
          <span className='text-xs text-gray-500'>
            {season?.air_date && getYear(season?.air_date)}
          </span>           
          <span className='text-xs text-gray-500'>
            {season?.episode_count} Episodes
          </span>
        </div>
        <p className='mt-[10px] text-[14px]'>{isDatePassed(season.air_date) ? (
          `Season ${season.season_number} of ${tvShowName} premiered on ${getFormattedDate(season?.air_date)}`
        ) : (
          `Season ${season.season_number} of ${tvShowName} is set to premiere on ${getFormattedDate(season?.air_date)}`
        )}
        </p>
        <p className='overflow-txt mt-[10px] text-[14px]'>{season?.overview}</p>
      </div>
    </div>
  )
}

export default SeasonCard