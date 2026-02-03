"use client"
import { getFormattedDate, getRuntime, getYear } from '@/lib/utils';
import React from 'react'
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { Heart } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useAuthContext } from '@/lib/providers/AuthContextProvider';
import AddListItemForm from '../user/lists/AddListItemForm';
import AddWatchlistItemForm from '../user/watchlist/AddWatchlistItemForm';
import UserScoreProgress from '../shared/UserScoreProgress';
import ImageWithFallback from '../shared/ImageWithFallback';

interface MovieInfoProps {
  movie: Movie
}

const MovieInfo = ({movie}: MovieInfoProps) => {
  const { user } = useAuthContext();
    
  const backgroundStyles = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path})`,
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
            <ImageWithFallback
              src={movie.poster_path}
              alt={movie.title} 
              className="rounded-[8px] max-w-none bg-[#dbdbdb]"
              width={300}
              height={450}
            />
          </div>
          <div className="flex flex-col gap-4 justify-center pl-5">
            <div className="flex flex-row gap-2 items-end">
              <h2 className='text-3xl font-bold'>{movie.title}</h2>
              <span className='text-2xl opacity-70'>({getYear(movie.release_date)})</span> 
            </div>
            <div className="flex flex-col">
              <p>Realease date: {getFormattedDate(movie.release_date)}</p>
              <p>Runtime: {getRuntime(movie.runtime).hours}h {getRuntime(movie.runtime).minutes}min</p>
              <p>Budget: ${movie.budget.toLocaleString()}</p>
              <p>Revenue: ${movie.revenue.toLocaleString()}</p>
              <p>Genres: {movie.genres?.map((genre) => 
                <span key={genre.id}>{genre.name}</span>
              ).reduce((prev, curr):any => [prev, ", ", curr])}
              </p>
              <div className='flex gap-2 items-center'>
                User
                <br />
                Score: 
                <UserScoreProgress vote_average={movie.vote_average} />                 
              </div>
            </div>
            <div className="flex flex-col">
              <p className='opacity-70 italic'>{movie.tagline}</p>
              <h4 className='font-bold'>Overview</h4>
              <p>{movie.overview}</p>              
            </div>
            <Separator />
            <div className="flex flex-row gap-2 items-center">
              <AddListItemForm userId={user?.$id!} itemId={movie.id} itemTitle={movie.title} itemType="movie" isInDropDown={false} />
              <AddWatchlistItemForm userId={user?.$id!} itemId={movie.id} itemTitle={movie.title} itemType="movie" isInDropDown={false} />
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

export default MovieInfo