import { getYear } from '@/lib/utils';
import React from 'react'
import { Separator } from '../ui/separator';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import ImageCard from '../shared/ImageCard';
import UserScoreProgress from '../shared/UserScoreProgress';
import MediaToggleButtons from '../shared/MediaToggleButtons';

interface TvShowInfoProps {
  tvShow: TvShow;
}

const TvShowInfo = ({tvShow}: TvShowInfoProps) => {
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
             <ImageCard
              src={tvShow.poster_path}
              width={300}
              height={450}  
              className="max-w-none"
            />
          </div>
          <div className="flex flex-col gap-4 justify-center pl-5">
            <div className="flex flex-col gap-1">
              <h2 className='text-3xl font-bold'>{tvShow.name}</h2>
              <div className="flex gap-2 items-center text-sm">
                <span className="opacity-70"> • {getYear(tvShow.first_air_date)} - {getYear(tvShow.last_air_date)}</span>
                <span className="opacity-70"> • {tvShow.number_of_seasons} seasons</span>
                <span className="opacity-70"> • {tvShow.number_of_episodes} episodes </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {tvShow.genres.map((genre) => (              
                <Link key={genre.id} href={`/discover/tv?genres=${genre.id}`}>
                  <Badge variant={"outline"} className="text-white border-gray-500 font-light">{genre.name}</Badge>
                </Link>
              ))}
            </div>
            <div className='flex gap-5'>
              <div className="flex items-center gap-2">
                <strong>User Score</strong>
                <UserScoreProgress vote_average={tvShow.vote_average} style="rounded" />                  
              </div>
              <Separator orientation='vertical' />
              <MediaToggleButtons mediaId={tvShow.id} mediaTitle={tvShow.name} mediaType="tv" />  
            </div>
            <div className="flex flex-col">
              <p className='opacity-70 italic'>{tvShow.tagline}</p>
              <p>
                <strong className="block">Overview</strong>
                {tvShow.overview}
              </p>
            </div>
            <p>
              <strong className="block">Creators</strong>
              {tvShow.created_by.map((creator => creator.name)).join(", ")}
            </p>                       
          </div>
        </div>
      </div>      
    </section>
  )
}

export default TvShowInfo