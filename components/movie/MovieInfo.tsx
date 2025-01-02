import { formatDate, formatRuntime, formatUserScore, formatUserScoreColor, formatYear } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'
import { Separator } from '../ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Heart, List } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface MovieInfoProps {
  movie: Movie
}

const MovieInfo = ({movie}: MovieInfoProps) => {
  const progressValue = formatUserScore(movie?.vote_average);
  const progresscolor = formatUserScoreColor(formatUserScore(movie?.vote_average));
  const circularProgressStyles = {
    background: `conic-gradient(${progresscolor.bar} ${progressValue * 3.6}deg, ${progresscolor.track} 0deg)`,
  }

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
        <div className="flex flex-row container py-8 text-white">
          <div className="poster-wrapper flex items-center">
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
              alt={movie.title} 
              className='rounded-[8px] max-w-none'
              width={300}
              height={450} 
            />
          </div>
          <div className="flex flex-col gap-4 justify-center pl-5">
            <div className="flex flex-row gap-2 items-end">
              <h2 className='text-3xl font-bold'>{movie.title}</h2>
              <span className='text-2xl opacity-70'>({formatYear(movie.release_date)})</span> 
            </div>
            <div className="flex flex-col">
              <p>Realease date: {formatDate(movie.release_date)}</p>
              <p>Runtime: {formatRuntime(movie.runtime).hours}h {formatRuntime(movie.runtime).minutes}min</p>
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
                  <div className="top-[-27px] w-[40px] h-[40px] rounded-full bg-black">
                    <div className="circularProgress" style={circularProgressStyles}>
                      <span className="circularProgress-value">{progressValue ? `${progressValue}%` : "NR"}</span>
                    </div>
                  </div>                   
              </div>
            </div>

            <div className="flex flex-col">
              <p className='opacity-70 italic'>{movie.tagline}</p>
              <h4 className='font-bold'>Overview</h4>
              <p>{movie.overview}</p>              
            </div>
            <Separator />
            <div className="flex flex-row gap-2 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className='rounded-full bg-slate-800' size={'icon'}>
                    <List />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Add to my watchlists</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='flex items-center gap-2'>Watchlist 1</DropdownMenuItem>
                  <DropdownMenuItem className='flex items-center gap-2'>Watchlist 2</DropdownMenuItem>
                  <DropdownMenuItem className='flex items-center gap-2'>Watchlist 3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
    
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