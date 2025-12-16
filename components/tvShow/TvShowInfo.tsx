"use client"
import { getFormattedDate, getUserScore, getUserScoreColor, getYear } from '@/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react'
import { Separator } from '../ui/separator';
import { Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import AddListItemForm from '../user/AddListItemForm';
import { useAuthContext } from '@/lib/providers/AuthContextProvider';

interface TvShowInfoProps {
  tvShow: TvShow
}

const TvShowInfo = ({tvShow}: TvShowInfoProps) => {
  const { user } = useAuthContext(); 
  const [imgSrc, setImgSrc] = useState(`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`);
  const imgSrcAlt = "/default-media-img.svg";
    
  const progressValue = getUserScore(tvShow?.vote_average);
  const progresscolor = getUserScoreColor(getUserScore(tvShow?.vote_average));
  const circularProgressStyles = {
    background: `conic-gradient(${progresscolor.bar} ${progressValue * 3.6}deg, ${progresscolor.track} 0deg)`,
  }

  const backgroundStyles = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${tvShow.backdrop_path})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  const backgroundOverlayStyles = {
    backgroundImage: `linear-gradient(to right, rgba(31.5, 10.5, 10.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 10.5, 10.5, 0.84) 50%, rgba(31.5, 10.5, 10.5, 0.84) 100%)`
  }

  return (
    <section style={backgroundStyles}>
      <div style={backgroundOverlayStyles}>
        <div className="flex flex-row container text-white">
          <div className="poster-wrapper flex items-center">
            <Image
              src={imgSrc} 
              alt={tvShow.name} 
              className='rounded-[8px] max-w-none bg-[#dbdbdb]'
              width={300}
              height={450}
              onError={() => setImgSrc(imgSrcAlt)}
            />
          </div>
          <div className="flex flex-col gap-4 justify-center pl-5">
            <div className="flex flex-row gap-2 items-end">
              <h2 className='text-3xl font-bold'>{tvShow.name}</h2>
              <span className='text-2xl opacity-70'>({getYear(tvShow.first_air_date)})</span> 
            </div>
            <div className="flex flex-col">
              <p>Seasons: {tvShow.number_of_seasons}</p>
              <p>Episodes {tvShow.number_of_episodes}</p>
              <p>First air date: {getFormattedDate(tvShow.first_air_date)}</p>
              <p>Last air date: {getFormattedDate(tvShow.last_air_date)}</p>  
              <p>Genres: {tvShow.genres?.map((genre) => 
                <span key={genre.id}>{genre.name}</span>
              ).reduce((prev, curr):any => [prev, ", ", curr])}
              </p>
              <div className='flex gap-2 items-center'>
                User
                <br />
                Score: 
                  <div className="top-[-27px] w-[40px] h-[40px] rounded-full bg-black">
                    <div className="circularProgress" style={circularProgressStyles}>
                      <span className="circularProgress-value">{progressValue ? `${progressValue}%` : "NR"}</span>
                    </div>
                  </div>                   
              </div>
            </div>
            <div className="flex flex-col">
              <p className='opacity-70 italic'>{tvShow.tagline}</p>
              <h4 className='font-bold'>Overview</h4>
              <p>{tvShow.overview}</p>              
            </div>
            <Separator />
            <div className="flex flex-row gap-2 items-center">
              <AddListItemForm userId={user?.$id!} itemId={tvShow.id} itemTitle={tvShow.name} itemType="tv" />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className='rounded-full bg-slate-800' size={'icon'}>
                      <Heart />
                    </Button>                  
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mark as favorite</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>             
          </div>
        </div>
      </div>      
    </section>
  )
}

export default TvShowInfo