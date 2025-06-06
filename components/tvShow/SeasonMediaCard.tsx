"use client"
import { getFormattedDate, getRuntime, getUserScore, getYear, isDatePassed } from '@/lib/utils'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

interface SeasonMediaCardProps {
  season?: TvShowSeason,
  episode?: TvShowSeasonEpisode,
  basePathname?: string,
  tvShowName?: string
}

const SeasonMediaCard = ({season, episode, basePathname, tvShowName}: SeasonMediaCardProps) => {
  const [imgSrc, setImgSrc] = useState(`https://image.tmdb.org/t/p/w500/${season?.poster_path || episode?.still_path}`);
  const imgSrcAlt = "/default-media-img.svg";
  
  const seasonPathname = season ? `${basePathname}/season/${season.season_number}` : "";

  const height = season ? "141" : "127";
  const width = season ? "94" : "227";

  return (
    <div className='flex flex-row gap-[10px] card-boxshadow rounded-[5px]'>
      <Link href={seasonPathname} className={`h-[${height}px] w-[${width}px] min-w-max`}>
        <Image 
          src={imgSrc}
          alt={season?.name! || episode?.name!} 
          className={`rounded-l-[5px] h-full max-w-none bg-[#dbdbdb]`}
          width={width}
          height={height}
          onError={() => setImgSrc(imgSrcAlt)}
        />
      </Link>   
      <div className={"flex flex-col py-[5px]"}>
        <p className='text-base font-bold flex gap-2'>
          {episode && (
            <span className='font-normal'>{episode.episode_number}</span>
          )}
          <Link href={seasonPathname} className='link-black'>
            {season?.name}
            {episode?.name}
          </Link>
        </p>
        <div className="flex gap-2 items-center">
          {season ? (
            <>
            {isDatePassed(season.air_date) && (
              <span className='bg-slate-800 text-white text-xs px-[5px] py-[5px] rounded-[5px] font-bold flex items-center gap-[5px]'>
                <StarIcon className={"w-[17px] h-[17px]"} />
                <span>{getUserScore(season.vote_average)}%</span>
              </span>            
            )}
            </>       
          ) : (
            <span className='bg-slate-800 text-white text-xs px-[5px] py-[5px] rounded-[5px] font-bold flex items-center gap-[5px]'>
              <StarIcon className={"w-[17px] h-[17px]"} />
              <span>{getUserScore(episode?.vote_average!)}%</span>
            </span>   
          )}
          <span className='text-xs text-gray-500'>
            {season?.air_date && getYear(season?.air_date)}
            {episode?.air_date && getFormattedDate(episode?.air_date)}
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
        {season && (
          <p className='mt-[10px] text-[14px]'>
            {isDatePassed(season.air_date!) ? (
              `Season ${season.season_number} of ${tvShowName} premiered on ${getFormattedDate(season.air_date!)}`
            ) : (
              `Season ${season.season_number} of ${tvShowName} is set to premiere on ${getFormattedDate(season.air_date!)}`
            )}
          </p>
        )}
        <p className='overflow-txt mt-[10px] text-[14px]'>
          {season?.overview}
          {episode?.overview}
        </p>
      </div>
    </div>
  )
}

export default SeasonMediaCard