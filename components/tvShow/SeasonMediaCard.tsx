import { getFormattedDate, getRuntime, isDatePassed } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import ImageWithFallback from '../shared/ImageWithFallback'
import UserScoreProgress from '../shared/UserScoreProgress'

interface SeasonMediaCardProps {
  season?: TvShowSeason;
  episode?: TvShowSeasonEpisode;
  basePathname?: string;
  tvShowName?: string;
}

const SeasonMediaCard = ({season, episode, basePathname, tvShowName}: SeasonMediaCardProps) => {
  const seasonPathname = season ? `${basePathname}/season/${season.season_number}` : "";

  const image = season?.poster_path || episode?.still_path;
  const overview = season?.overview || episode?.overview;
  const name = season?.name || episode?.name;
  const airDate = season?.air_date || episode?.air_date;
  const voteAverage = season?.vote_average || episode?.vote_average;

  const height = season ? 141 : 127;
  const width = season ? 94 : 227;

  return (
    <div className='flex flex-row card-boxshadow rounded-[5px]'>
      <Link href={seasonPathname} className={`h-[${height}px] w-[${width}px] min-w-max`}>
        <ImageWithFallback 
          src={image!}
          alt={name!} 
          className={`rounded-l-[5px] h-full max-w-none bg-[#dbdbdb]`}
          width={width}
          height={height}
        />
      </Link>   
      <div className={"flex flex-col py-[5px] px-[10px]"}>
        <p className='text-base font-bold flex gap-2'>
          {episode && (
            <span className='font-normal'>{episode.episode_number}</span>
          )}
          <Link href={seasonPathname} className='link-black'>
            {name}
          </Link>
        </p>
        <div className="flex gap-2 items-center mt-[2px]">
          <UserScoreProgress vote_average={voteAverage!} style='badge' />
          <span className='text-xs text-gray-500'>
            {airDate && getFormattedDate(airDate)}
          </span>           
          <span className='text-xs text-gray-500'>
            {season && (
              `${season.episode_count} Episodes`
            )}
            {episode && (
              `${getRuntime(episode.runtime).hours}h ${getRuntime(episode.runtime).minutes}m`
            )} 
          </span>
        </div>
        {season && !isDatePassed(season.air_date) && (
          <p className='mt-[10px] text-[14px]'>
            {`Season ${season.season_number} of ${tvShowName} is set to premiere on ${getFormattedDate(season.air_date!)}`}
          </p>
        )}
        <p className='overflow-txt mt-[10px] text-[14px]'>
          {overview}
        </p>
      </div>
    </div>
  )
}

export default SeasonMediaCard